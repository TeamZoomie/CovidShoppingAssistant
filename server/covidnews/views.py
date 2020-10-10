'''
Contains information on the views that requests go to when accessing the API.
'''

from datetime import datetime, timezone
import environ

from newsapi import NewsApiClient
from rest_framework import status, viewsets
from rest_framework.response import Response

from .serializers import CovidArticlesSerializer
from .models import CovidArticles

# API key is hidden by using environment variables. Look at .env.example
env = environ.Env()
environ.Env.read_env()
API_KEY = env("NEWS_API_KEY")

# Update the model every 6 hours
UPDATE_TIME = 432000
updatedTime = datetime.now(timezone.utc)

def get_next_id_number():
    '''
    Returns the next id number using linear probing.
    '''
    counter = 0
    while True:
        if CovidArticles.objects.filter(idField=counter):
            counter = counter + 1
        else:
            return counter

def update_news():
    '''
    Updates the objects of CovidArticles by grabbing new news articles from the NewsAPIClient.
    '''
    CovidArticles.objects.all().delete()
    # Update every 30 minutes
    locations = {'au', 'us', 'gb', 'ca', 'fr', 'in', 'br', 'ru', 'mx', 'za',
                 'de', 'se', 'tr', 'it'}

    newsapi = NewsApiClient(api_key=API_KEY)
    # Loops through all country locations and updates each model with news articles
    for loc in locations:
        payload = newsapi.get_top_headlines(q='covid', language='en', country=loc)
        id_number = get_next_id_number()
        created = CovidArticles.objects.create(
            idField=id_number,
            articles=payload['articles'],
            addedDate=datetime.now(timezone.utc),
            country=loc
            )


class CovidNewsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for getting the latest covid news
    """
    update_news()
    updatedTime = datetime.now(timezone.utc)
    queryset = CovidArticles.objects.all()
    serializer_class = CovidArticlesSerializer

    # Custom get_object to return object by country
    def get_object(self):
        countryCodeMap = {
            'Australia': 'au',
            'USA': 'us',
            'UK': 'gb',
            'Canada': 'ca',
            'France': 'fr',
            'India': 'in',
            'Brazil': 'br',
            'Russia': 'ru',
            'Mexico': 'mx',
            'SouthAfrica': 'za',
            'Germany': 'de',
            'Sweden': 'se',
            'Turkey': 'tr',
            'Italy': 'it'
        }
        country = CovidArticles.objects.get(country=countryCodeMap[self.kwargs['pk']])
        return country

    # Override retrieve so that it updates the model at a certain time
    def retrieve(self, request, *args, **kwargs):
        # Update CovidArticles if 6 hours have passed since the last update
        if (datetime.now(timezone.utc) - updatedTime).seconds > UPDATE_TIME:
            update_news()
        try:
            instance = self.get_object()
        except(CovidArticles.DoesNotExist, KeyError):
            # Return an error if the object does not exist
            return Response({"error": "Articles do not exist"}, status=status.HTTP_404_NOT_FOUND)
        ser = CovidArticlesSerializer(instance)
        return Response(ser.data)
        