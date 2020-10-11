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

## livetimes/
This application grabs the live location data of places specified by a PlaceID.

Accepted Methods: GET
Example request. `GET ../livetimes/ChIJL5mtadOvEmsRSmzg_zk92N8/`

## userlogin/
This application creates a user to use with the API, by taking a username and password.

## api-token-auth/
This application grants the user an API token to use with requests to the list application.

## admin/
Can only be accessed from a web browser to access the administrator portal. Can update, delete and create models.