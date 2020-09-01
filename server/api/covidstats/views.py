from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from rest_framework import viewsets

from .serializers import CovidSerializer
from .models import CovidStatsAustralia

class UserViewSet (viewsets.ModelViewSet):
    queryset = CovidStatsAustralia.objects.all().order_by('name')
    serializer_class = CovidSerializer