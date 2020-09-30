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
    CovidAustralia.objects.all().delete()
    locations = {'Australia', 'USA', 'UK', 'Canada', 'Spain', 'India', 'Brazil',
        'Russia', 'Mexico', 'South Africa', 'Chile', 'Germany', 'Sweden'}
    for loc in locations:
        update = requests.get(f'https://coronavirus-19-api.herokuapp.com/countries/{loc}/').json()
        for key, value in update.items():
            if value is None:
                update[key] = 0
        try:
            obj = CovidAustralia.objects.create(**update)
            obj.save()
        except CovidAustralia.DoesNotExist:
            pass


class CovidViewSet(viewsets.ModelViewSet):
    """
    API endpoint for gathering latest covid data for Australia
    """
    update_model()
    queryset = CovidAustralia.objects.all()
    serializer_class = CovidSerializer
    
