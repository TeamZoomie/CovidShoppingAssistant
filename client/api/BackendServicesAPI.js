
import Constants from "expo-constants";

// To access locally.. This is a bit tricky. Consult Adrian
const { manifest } = Constants;
const BACKEND_URL = `http://${manifest.debuggerHost.split(':').shift()}:8000`;


export function getCovidNews(country='Australia') {
    return fetch(BACKEND_URL + '/covidnews/' + country)
        .then(response => response.json());
}

export function getCovidStats(country='Australia') {
    return fetch(BACKEND_URL + '/covidstats/' + country, {
        method: 'GET',
    })
        .then(response => response.json());
}