from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import ListModel
from .serializers import ListSerializer

class ListViewSet(viewsets.ModelViewSet):
    """ API endpoint for interacting with lists
    """
    queryset = ListModel.objects.all()
    serializer_class = ListSerializer
