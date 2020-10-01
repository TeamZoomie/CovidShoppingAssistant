from rest_framework import serializers
from .models import CovidNews, ArticleDump

class CovidNewsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CovidNews
        fields = ['description', 'publishedDate', 'title', 'url']

class ArticleDumpSerializer(serializers.HyperlinkedModelSerializer):

    articles = serializers.JSONField()
    class Meta:
        model = ArticleDump
        fields = ['addedDate', 'articles']
