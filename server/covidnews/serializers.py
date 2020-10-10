'''
The serializer class that is used to convert the document from MongoDB to a
serializer instance.
'''
from rest_framework_mongoengine import serializers
from .models import CovidArticles


class CovidArticlesSerializer(serializers.DocumentSerializer):
    '''
    The serializer for the document CovidArticles.
    '''
    class Meta:
        model = CovidArticles
        fields = ['country', 'addedDate', 'articles']
