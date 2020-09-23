from rest_framework import serializers
from .models import ListModel, ItemModel
import json

class ItemSerializer(serializers.Serializer):
    class Meta:
        model = ItemModel
        fields = ['name', 'category', 'quantity', 'checked']

class ListSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True)
    class Meta:
        model = ListModel
        fields = ['idField', 'name', 'date', 'dueDate', 'colour', 'items']
