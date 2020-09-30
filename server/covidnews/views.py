from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import CovidNewsSerializer, ArticleDumpSerializer
from .models import CovidNews, ArticleDump
from .article import ParseFeed
import requests
import json
from newsapi import NewsApiClient
from datetime import datetime, timezone

# Ask Adrian... but should make this global & hidden from repo
API_KEY = ''

def retrieve_lastest_news():
    # Update every 30 minutes
    queryTime = 30 * 60

    latest = ArticleDump.objects.order_by('-id').first()

    # Retrieve latest if not found
    if not latest or (datetime.now(timezone.utc) - latest.addedDate).seconds > queryTime:
        newsapi = NewsApiClient(api_key=API_KEY)
        payload = newsapi.get_top_headlines(q='covid', language='en', country='au')
        created = ArticleDump.objects.create(
            articles=payload['articles'], 
            addedDate=datetime.now(timezone.utc)
        )
        return created
    return latest

class CovidNewsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for getting the latest covid news
    """
    queryset = ArticleDump.objects.all()
    serializer_class = ArticleDumpSerializer

    def list(self, request):
        latest = retrieve_lastest_news()
        print(latest)
        serializer = self.get_serializer(latest)
        return Response(serializer.data)