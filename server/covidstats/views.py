from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CovidSerializer
from .models import CovidAustralia
import requests
import json

def update_model():
    locations = {'Australia', 'USA', 'UK', 'Canada', 'Spain', 'India', 'Brazil',
        'Russia', 'Mexico', 'South Africa', 'Chile', 'Germany', 'Sweden'}
    for i in locations:
        data = requests.get(f'https://coronavirus-19-api.herokuapp.com/countries/{i}/')
        update = {
            'country': data.json()["country"],
            'cases': data.json()['cases'],
            'todayCases': data.json()['todayCases'],
            'deaths': data.json()['deaths'],
            'todayDeaths': data.json()['todayDeaths'],
            'recovered': data.json()['recovered'],
            'active': data.json()['active'],
            'critical': data.json()['critical'],
            'casesPerOneMillion': data.json()['casesPerOneMillion'],
            'deathsPerOneMillion': data.json()['deathsPerOneMillion'],
            'totalTests': data.json()['totalTests'],
            'testsPerOneMillion': data.json()['testsPerOneMillion']}
            
        for key in update:
            if update[key] == None:
                update[key] = "0"
        try:
            obj = CovidAustralia.objects.get(country=i)
            for key, value in update.items():
                setattr(obj, key, value)
                obj.save()
        except CovidAustralia.DoesNotExist:
            obj = CovidAustralia(**update)
            obj.save()



class CovidViewSet(viewsets.ModelViewSet):
    """
    API endpoint for gathering latest covid data for Australia
    """
    update_model()
    queryset = CovidAustralia.objects.all()
    serializer_class = CovidSerializer
    
