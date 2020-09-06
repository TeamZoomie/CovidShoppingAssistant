from rest_framework import serializers
from .models import NewsModel

class NewsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = NewsModel
        fields = ('number', 'json')
