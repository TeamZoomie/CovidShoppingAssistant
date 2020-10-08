from rest_framework import serializers
from .models import ArticleDump

class ArticleDumpSerializer(serializers.HyperlinkedModelSerializer):

    articles = serializers.JSONField()
    class Meta:
        model = ArticleDump
        fields = ['country', 'addedDate', 'articles']