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

def update_news():
    ArticleDump.objects.all().delete()
    # Update every 30 minutes
    queryTime = 30 * 60
    locations = {'au', 'us', 'gb', 'ca', 'fr', 'in', 'br', 'ru', 'mx', 'za',
            'de', 'se', 'tr', 'it'}

    latest = ArticleDump.objects.order_by('-id').first()

    # Retrieve latest if not found
    if not latest or (datetime.now(timezone.utc) - latest.addedDate).seconds > queryTime:
        for loc in locations:
            newsapi = NewsApiClient(api_key=API_KEY)
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
    queryset = ArticleDump.objects.all()
    serializer_class = ArticleDumpSerializer
    
    def get_object(self):
        country = ArticleDump.objects.get(country=self.kwargs['pk'])
        return country
        
    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except(ArticleDump.DoesNotExist, KeyError):
            return Response({"error": "Articles do not exist"}, status=status.HTTP_404_NOT_FOUND)
        ser = ArticleDumpSerializer(instance)
        return Response(ser.data)
        
