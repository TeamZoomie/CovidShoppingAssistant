from rest_framework_mongoengine import serializers
from .models import CovidArticles

class CovidArticlesSerializer(serializers.DocumentSerializer):

    class Meta:
        model = CovidArticles
        fields = ['country', 'addedDate', 'articles']