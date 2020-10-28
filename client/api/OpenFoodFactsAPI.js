/**
 * Interacts with the OpenFoodFacts API to retrieve information about different
 * food products. This is a good source for adding product information to this
 * program (about food products).
 */

export function getProductDetails({ barcode, countryCode='world' }) {

    const API_URL = `https://${countryCode}.openfoodfacts.org/api/v0/product/`;
    // Expo.Constants.getWebViewUserAgentAsync()
        // .then(agent => {console.log('User agent:', agent)})

    return fetch(API_URL + barcode, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // UserAgent: userAgent
            }
        })
        .then(response => response.json());
}