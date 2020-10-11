# List of applications the server provides
## covidnews/
This application grabs the latest covid news articles from different countries and presents them in a format that the client app can receive.

Accepted Methods: GET  
Example request. `GET ../covidnews/Australia/`  
On a successful request, returns:
```json
{
    "country": "au",
    "addedDate": "2020-10-11T06:47:42.673000+10:00",
    "articles": [
        {
            "author": null,
            "title": "‘Feeling great!’: Trump gets back on the campaign trail just days after COVID-19 scare - The Australian",
            "description": "Subscribe to The Australian to get unrestricted digital access, home paper delivery, Apps for iPad and Android, member only +Rewards and much more...",
            "url": "https://www.theaustralian.com.au/subscribe/news/1/",
            "urlToImage": null,
            "publishedAt": "2020-10-10T18:10:00Z",
            "content": null,
            "source": {
                "id": null,
                "name": "The Australian"
            }
        }
    ]
}
```

## covidstats/
This application grabs the latest covid statistics from an API and presents them in a format that the client app can receive.

Accepted Methods: GET    
Example request. `GET ../covidstats/Australia`  
On a successful request, returns:  
```json
{
    "country": "Australia",
    "cases": 27265,
    "todayCases": 21,
    "deaths": 898,
    "todayDeaths": 1,
    "recovered": 24998,
    "active": 1369,
    "critical": 1,
    "casesPerOneMillion": 1066,
    "deathsPerOneMillion": 35,
    "totalTests": 8007588,
    "testsPerOneMillion": 313024
}
```

## list/
This application stores users list so that they can be used as a backup or to share lists.

Accepted Methods: GET, POST, PATCH  
In order to access any requests in this application, the request needs the Authorization header, with a Token. The Token can be aquired from http://../api-token-auth. List expects the Token to presented in the Authorization header as `"Authorization: Token [token]"`  

A successful GET request will return the list from the server where the last value is the ID of the list. Example: `curl -X GET http://../list/0/`  
Returns: 
```json
{
    "idField": 0,
    "name": "Daily",
    "date": "2020",
    "dueDate": "2021",
    "colour": "green",
    "items": [
        {
            "name": "Apple",
            "category": "Fruit",
            "quantity": 1,
            "checked": false
        }
    ]
}
```

A successful POST request will create a new list on the server. The `idField` value does not need to be set (could be set to anything) as the server will assign an ID to the created list. The server will return the ID of the list if the request is successful. The Post request needs to be formated similar to the list above. THe request should be sent to http://../list/.

A successful PATCH request will modify a list already on the server. The returned message will be either be `{ "Okay": "List updated" }`, if the requester is the owner of the list, or  `{ "error": "Not the owner of the list" }`, if the requester is not the owner of the list. The patch message should contain the correct `idField` value which matches whats put in the url. E.g., http://../list/0/ with `{"idField": 0,..}`.

## livetimes/
This application grabs the live location data of places specified by a PlaceID.

Accepted Methods: GET  
Example request. `GET ../livetimes/ChIJL5mtadOvEmsRSmzg_zk92N8/`  
On a successful request, returns:  
```json
{
    "place_id": "ChIJL5mtadOvEmsRSmzg_zk92N8",
    "name": "Pizzeria Da Alfredo",
    "populartimes": [
        {
            "name": "Monday",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            "name": "Tuesday",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                8,
                17,
                23,
                22,
                14,
                0,
                0
            ]
        },
        {
            "name": "Wednesday",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                12,
                26,
                38,
                37,
                23,
                0,
                0
            ]
        },
        {
            "name": "Thursday",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                8,
                24,
                36,
                30,
                13,
                0,
                0
            ]
        },
        {
            "name": "Friday",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                22,
                61,
                100,
                94,
                51,
                0,
                0
            ]
        },
        {
            "name": "Saturday",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                18,
                48,
                83,
                92,
                67,
                0,
                0
            ]
        },
        {
            "name": "Sunday",
            "data": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                13,
                26,
                34,
                27,
                13,
                0,
                0
            ]
        }
    ],
    "current_popularity": 0
}
```

## usercreate/
This application creates a user to use with the API, by taking a username and password.

Accepted Methods: POST  
Example request: `curl -d '{"username": "[username]", "password": "[password]"}' -H "Content-Type: application/json" -X POST http://../usercreate/`  
On a successful request, returns:
```json
{
    "username": "[username]"
}
```

## api-token-auth/
This application grants the user an API token to use with requests to the list application. The user must exist in the database in order to create and use a token. To create a user, see usercreate/  

Accepted Methods: POST  
Example request: `curl -d  '{"username": "[username]", "password": "[password]"}' -H "Content-Type: application/json" -X POST http://../api-token-auth/`  
On a sucessful request, returns:
```json
{
	"token": "[token]"
}
```

## admin/
Can only be accessed from a web browser to access the administrator portal. Can update, delete and create models. To access, you need to use a django superuser account, created on the server with the following command,  

`python manage.py createsuperuser`.