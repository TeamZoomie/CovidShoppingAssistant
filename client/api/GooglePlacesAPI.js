import Qs from 'qs';

API_KEY = 'AIzaSyAzboaXtyD8y4rtHgGBmdkxSUydF4_-4v8';
API_URL = 'https://maps.googleapis.com/maps/api/place/';

export function getPlacesAutocomplete({ input, location, radius, countryCode='aus', type }, onError) {

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
        .then(response => response.json())
        .then(payload => {
            console.log(payload)
            return payload;
        })
        .catch(onError);
}

export function getPlaceDetails({}) {

}