/**
 * Handles communication with the backend services and server. This includes
 * data for the news page.
 */

import Constants from "expo-constants";


// Define some useful constants
const { manifest } = Constants;
const BACKEND_URL = 'https://deco3801-zoomie.uqcloud.net';

/**
 * Gets news articles from the server.
 */
export function getCovidNews(country='Australia') {
    return fetch(`${BACKEND_URL}/covidnews/${country}/`)
        .then(response => response.json());
}

/**
 * Gets numerical statistics about COVID form the server.
 */
export function getCovidStats(country='Australia') {
    return fetch(`${BACKEND_URL}/covidstats/${country}/`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json());
}

export function getPlaceLiveBusyness(placeID) {
    return fetch(`${BACKEND_URL}/livetimes/${placeID}/`)
        .then(response => response.json());
}
