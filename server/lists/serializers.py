from rest_framework import serializers
from .models import ListModel

class ListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ListModel
        fields = ['idField']
