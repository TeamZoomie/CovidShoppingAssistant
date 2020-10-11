'''
This file contains the serializer for the LiveTime model.
'''
from rest_framework_mongoengine import serializers
from .models import LiveTime


class LiveTimeSerializer(serializers.DocumentSerializer):
    '''
    The serializer for the document LiveTime.
    '''
    class Meta:
        model = LiveTime
        fields = ('place_id', 'name', 'populartimes', 'current_popularity')