import Qs from 'qs';

// Ask Adrian for this / check
const API_KEY = 'AIzaSyBy4J2u8Xo8Vaq0VV7b5FI_j6_TKMt16cI';
const API_URL = 'https://maps.googleapis.com/maps/api/place/';

export function getPlacesAutocomplete({ input, location, radius, countryCode='aus', type }) {

    const body = Qs.stringify({
        input: encodeURIComponent(input),
        location,
        origin: location,
        radius,
        language: 'en',
        components: 'country:' + countryCode,
        types: type,
        key: API_KEY
    });
    
    return fetch(API_URL + 'autocomplete/json?' + body)
        .then(response => response.json());
}

export function getPlacesNearby({ keyword, location, rankby, type }) {
    const body = Qs.stringify({
        keyword: encodeURIComponent(keyword),
        location,
        rankby,
        language: 'en',
        // components: 'country:' + countryCode,
        type,
        key: API_KEY
    });
    
    return fetch(API_URL + 'nearbysearch/json?' + body)
        .then(response => response.json());
}