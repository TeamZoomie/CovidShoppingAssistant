from django.shortcuts import render

#Create your views here.
from django.http import HttpResponse
from rest_framework import viewsets

from .serializers import UserSerializer
from .models import Legends

class UserViewSet (viewsets.ModelViewSet):
    queryset = Legends.objects.all().order_by('name')
    serializer_class = UserSerializer

#def index(request):
 #   return HttpResponse("This is where the API is going to be")
