from django.shortcuts import render

# Create your views here.
from rest_framework_mongoengine import viewsets
from rest_framework.views import status
from rest_framework.response import Response
from .serializers import CovidSerializer
from .models import CovidAustralia
import requests
import json
from datetime import datetime, timezone

# Update the model every 6 hours
UPDATE_TIME = 43200
updatedTime = datetime.now(timezone.utc)

def update_model():
    CovidAustralia.objects.all().delete()
    locations = {'Australia', 'USA', 'UK', 'Canada', 'Spain', 'India', 'Brazil',
        'Russia', 'Mexico', 'South Africa', 'Chile', 'Germany', 'Sweden', 'Turkey',
        'Italy'}
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
    updatedTime = datetime.now(timezone.utc)
    lookup_field = 'country'
    queryset = CovidAustralia.objects.all()
    serializer_class = CovidSerializer
    
    def get_object(self):
        country = CovidAustralia.objects.get(country=self.kwargs['country'])
        return country
        
    def retrieve(self, request, *args, **kwargs):
        if (datetime.now(timezone.utc) - updatedTime).seconds > UPDATE_TIME:
            update_model()
        try:
            instance = self.get_object()
        except (CovidAustralia.DoesNotExist, KeyError):
            return Response({"error": "Item does not exist"}, status=status.HTTP_404_NOT_FOUND)
        ser = CovidSerializer(instance)
        return Response(ser.data)
