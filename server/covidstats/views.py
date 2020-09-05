from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializers import CovidSerializer, NewsSerializer
from .models import CovidAustralia, NewsModel
from .article import ParseFeed
import requests
import json

class CovidViewSet(viewsets.ModelViewSet):
    """
    API endpoint for gathering latest covid data
    """
    queryset = CovidAustralia.objects.all()
    serializer_class = CovidSerializer

    CovidAustralia.objects.all().delete()

class NewsViewSet(viewsets.ModelViewSet):
    """
    API endpoint for getting the latest news
    """
    queryset = NewsModel.objects.all()
    serializer_class = NewsSerializer


topic = 'covid-19'
hl = 'en-AU'
ceid = 'AU:en'
sort = 'date'
region = 'AU'
num = 5
output= 'rss'

url = f"http://news.google.com/rss/search?q={topic}&hl={hl}&sort={sort}&gl={region}&ceid={ceid}"

feed = ParseFeed(url)
articles = feed.parse()

createdObj, created = NewsModel.objects.update_or_create(
        number='0', json=articles,
    )

data = requests.get('https://coronavirus-19-api.herokuapp.com/countries/Australia')
update = {'country': data.json()['country'], 
            'cases': data.json()['cases'],                      
            'todayCases': data.json()['todayCases'],            
            'deaths': data.json()['deaths'],                    
            'todayDeaths': data.json()['todayDeaths'],          
            'recovered': data.json()['recovered'],              
            'active': data.json()['active'],                    
            'critical': data.json()['critical'],                
            'casesPerOneMillion': data.json()['casesPerOneMillion'],
            'deathsPerOneMillion': data.json()['deathsPerOneMillion'],                                                                'totalTests': data.json()['totalTests'],            
            'testsPerOneMillion': data.json()['testsPerOneMillion']}
        
try:                                                               
    obj = CovidAustralia.objects.get(country='Australia')          
    for key, value in update.items():                              
        setattr(obj, key, value)                                   
        obj.save()                                                     
except CovidAustralia.DoesNotExist:                                
    obj = CovidAustralia(**update)
    obj.save()
