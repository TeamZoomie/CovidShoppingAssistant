from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializers import NewsSerializer
from .models import NewsModel
from .article import ParseFeed
import requests
import json

class NewsViewSet(viewsets.ModelViewSet):
    """
    API endppoint for getting the latest covid news
    """
    queryset = NewsModel.objects.all()
    serializer_class = NewsSerializer

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

createdObj, created = NewsModel.objects.update_or_create(
        number='0', json=articles,
        )
