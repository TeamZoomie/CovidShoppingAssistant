'''
Contains the view of the application, UserCreate.
The purpose of this view is to create a user in the django settings.
'''
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from .serializers import UserSerializer


class UserCreate(generics.CreateAPIView):
    '''
    API endpoint for creating a user using the CreateAPIView generic class
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny, )  # Anybody can create a user
