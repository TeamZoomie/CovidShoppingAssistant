from rest_framework import serializers
from .models import CovidNews

class CovidNewsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CovidNews
        fields = ['version', 'json']
