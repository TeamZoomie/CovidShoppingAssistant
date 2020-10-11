'''
Contains the serializer for the list model.
'''
from rest_framework_mongoengine import serializers
from .models import ListModel


class ListSerializer(serializers.DocumentSerializer):
    '''
    The serializer for the document ListModel.
    '''
    class Meta:
        model = ListModel
        fields = ('idField', 'name', 'date', 'dueDate', 'colour', 'items')
