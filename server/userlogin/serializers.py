'''
Contains a serializer which is used to create users using the default Auth User model.
'''
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    '''
    Is used to create a user given a username and password.
    The username needs to be unique.
    '''
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    # Override create so that we can check for password length if we want
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data) # Create new user
        user.set_password(password)
        user.save()
        return user
