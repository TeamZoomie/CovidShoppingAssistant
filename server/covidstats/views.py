from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializers import CovidSerializer
from .models import CovidAustralia
import requests

class CovidViewSet(viewsets.ModelViewSet):
    """
    API endpoint
    """
    data = requests.get('https://coronavirus-19-api.herokuapp.com/countries/Australia')

    instance = CovidAustralia.objects.create(country = data.json()['country'],
            cases = data.json()['cases'],
            todayCases = data.json()['todayCases'],
            deaths = data.json()['deaths'],
            todayDeaths = data.json()['todayDeaths'],
            recovered = data.json()['recovered'],
            active = data.json()['active'],
            critical = data.json()['critical'],
            casesPerOneMillion = data.json()['casesPerOneMillion'],
            deathsPerOneMillion = data.json()['deathsPerOneMillion'],
            totalTests = data.json()['totalTests'],
            testsPerOneMillion = data.json()['testsPerOneMillion'])

    
    
    queryset = CovidAustralia.objects.all()
    serializer_class = CovidSerializer

    
