from rest_framework import status, viewsets
from rest_framework.response import Response
from .serializers import CovidArticlesSerializer
from .models import CovidArticles
from .article import ParseFeed
import requests
import json
from newsapi import NewsApiClient
from datetime import datetime, timezone

# API key is hidden by using environment variables. Look at .env.example
import environ
env = environ.Env()
environ.Env.read_env()
API_KEY = env("NEWS_API_KEY")

# Update the model every 6 hours
UPDATE_TIME = 432000
updatedTime = datetime.now(timezone.utc)


def get_next_id_number():
    counter = 0
    while True:
        if CovidArticles.objects.filter(idField=counter):
            counter = counter + 1
        else:
            return counter

def update_news():
    CovidArticles.objects.all().delete()
    # Update every 30 minutes
    locations = {'au', 'us', 'gb', 'ca', 'fr', 'in', 'br', 'ru', 'mx', 'za',
                 'de', 'se', 'tr', 'it'}

    newsapi = NewsApiClient(api_key=API_KEY)
    for loc in locations:
        payload = newsapi.get_top_headlines(q='covid', language='en', country=loc)
        idNumber = get_next_id_number()
        created = CovidArticles.objects.create(
            idField = idNumber,
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
        
    def retrieve(self, request, *args, **kwargs):
        if (datetime.now(timezone.utc) - updatedTime).seconds > UPDATE_TIME:
            update_news()
        try:
            instance = self.get_object()
        except(CovidArticles.DoesNotExist, KeyError):
            return Response({"error": "Articles do not exist"}, status=status.HTTP_404_NOT_FOUND)
        ser = CovidArticlesSerializer(instance)
        return Response(ser.data)
        


