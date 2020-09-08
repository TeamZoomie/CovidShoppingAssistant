from rest_framework import viewsets
from .serializers import CovidNewsSerializer
from .models import CovidNews
from .article import ParseFeed
import requests
import json


class CovidNewsViewSet(viewsets.ModelViewSet):
    """
    API endpoint for getting the latest covid news
    """
    queryset = CovidNews.objects.all()
    serializer_class = CovidNewsSerializer

topic = 'covid-19'
hl = 'en-AU'
ceid = 'AU:en'
sort = 'date'
region = 'AU'
num = 5
output = 'rss'

url = f"http://news.google.com/rss/search?q={topic}&hl={hl}&sort={sort}&gl={region}&ceid={ceid}"

feed = ParseFeed(url)
articles = feed.parse()

createdObj, created = CovidNews.objects.update_or_create(
        version='0', json=articles,
        )
