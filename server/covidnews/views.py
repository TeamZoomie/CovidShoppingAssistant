from rest_framework import status, viewsets
from rest_framework.response import Response
from .serializers import CovidNewsSerializer, ArticleDumpSerializer
from .models import CovidNews, ArticleDump
from .article import ParseFeed
import requests
import json
from newsapi import NewsApiClient
from datetime import datetime, timezone

# API key is hidden by using environment variables. Look at .env.example
import environ
env = environ.Env()
environ.Env.read_env()
API_KEY = env("API_KEY")

# Update the model every 6 hours
UPDATE_TIME = 43200
updatedTime = datetime.now(timezone.utc)

def update_news():
    ArticleDump.objects.all().delete()
    # Update every 30 minutes
    locations = {'au', 'us', 'gb', 'ca', 'fr', 'in', 'br', 'ru', 'mx', 'za',
            'de', 'se', 'tr', 'it'}

    newsapi = NewsApiClient(api_key=API_KEY)
    for loc in locations:
        payload = newsapi.get_top_headlines(q='covid', language='en', country=loc)
        created = ArticleDump.objects.create(
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
    queryset = ArticleDump.objects.all()
    serializer_class = ArticleDumpSerializer
    
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
        country = ArticleDump.objects.get(country=countryCodeMap[self.kwargs['pk']])
        return country
        
    def retrieve(self, request, *args, **kwargs):
        if (datetime.now(timezone.utc) - updatedTime).seconds > UPDATE_TIME:
            update_news()
        try:
            instance = self.get_object()
        except(ArticleDump.DoesNotExist, KeyError):
            return Response({"error": "Articles do not exist"}, status=status.HTTP_404_NOT_FOUND)
        ser = ArticleDumpSerializer(instance)
        return Response(ser.data)
        
