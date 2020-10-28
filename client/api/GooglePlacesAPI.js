/**
 * Handles communication with Google for the various services we use from
 * their API. These include different details about nearby stores.
 */

import Qs from 'qs';

// Ask Adrian for this / check
const API_KEY = '';
const API_URL = 'https://maps.googleapis.com/maps/api/place/';

/**
 * Retrieves the store locations according to the input text provided. Also
 * uses the user's location coordinates.
 */
export function getPlacesAutocomplete({ input, location, radius, 
        countryCode='aus', type }) {

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

/**
 * Retrieves the stores close to a given location.
 */
export function getPlacesNearby({ keyword, location, rankby, type }) {
    const body = Qs.stringify({
        keyword: encodeURIComponent(keyword),
        location,
        rankby,
        language: 'en',
        type,
        key: API_KEY
    });
    
    return fetch(API_URL + 'nearbysearch/json?' + body)
        .then(response => response.json());
}