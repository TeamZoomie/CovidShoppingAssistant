'''
Contains the view of the application, UserCreate.
The purpose of this view is to create a user in the django settings.
'''
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import status

from .serializers import UserSerializer


class UserCreate(generics.CreateAPIView):
    '''
    API endpoint for creating a user using the CreateAPIView generic class
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny, )  # Anybody can create a user

    def post(self, request, *args, **kwargs):
        user = UserSerializer.create(UserSerializer, request.data)
        return Response({"username": user}, status=status.HTTP_201_CREATED)
