from rest_framework_mongoengine import serializers
from .models import LiveTime

class LiveTimeSerializer(serializers.DocumentSerializer):
    class Meta:
        model = LiveTime
        fields = ('place_id', 'name', 'populartimes', 'current_popularity')