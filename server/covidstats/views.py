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
    queryset = CovidAustralia.objects.all(
    serializer_class = CovidSerializer

    CovidAustralia.objects.all().delete()

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
