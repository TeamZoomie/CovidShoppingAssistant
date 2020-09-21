from rest_framework import viewsets
from .serializers import CovidNewsSerializer
from .models import CovidNews
from .article import ParseFeed
import requests
import json


def update_news():
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
    
    for item in articles:
        createdObj, created = CovidNews.objects.update_or_create(
            description=item['Description'], publishedDate=item['Published Date'],
            title=item['Title'], url=item['Url']
        )

class CovidNewsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for getting the latest covid news
    """
    #update_news()
    queryset = CovidNews.objects.all()
    serializer_class = CovidNewsSerializer
    

#topic = 'covid-19'
#hl = 'en-AU'
#ceid = 'AU:en'
#sort = 'date'
#region = 'AU'
#num = 5
#output = 'rss'

#url = f"http://news.google.com/rss/search?q={topic}&hl={hl}&sort={sort}&gl={region}&ceid={ceid}"

#feed = ParseFeed(url)
#articles = feed.parse()

#createdObj, created = CovidNews.objects.update_or_create(
#        version='0', json=articles,
#        )
