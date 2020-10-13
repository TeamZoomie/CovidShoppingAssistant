
import Constants from "expo-constants";
import { BackHandler } from "react-native";

// To access locally.. This is a bit tricky. Consult Adrian
// const BACKEND_URL = manifest.debuggerHost ? `http://${manifest.debuggerHost.split(':').shift()}:8000` : 'http://localhost:8000';

const { manifest } = Constants;
const BACKEND_URL = 'https://deco3801-zoomie.uqcloud.net';


export function getCovidNews(country='Australia') {
    return fetch(`${BACKEND_URL}/covidnews/${country}/`)
        .then(response => response.json());
}

export function getCovidStats(country='Australia') {
    return fetch(`${BACKEND_URL}/covidstats/${country}/`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json());
}

export function getPlaceLiveBusyness({}) {
    
}