from rest_framework_mongoengine import serializers
from .models import ListModel

class ListSerializer(serializers.DocumentSerializer):
    class Meta:
        model = ListModel
        fields = ('idField', 'name', 'date', 'dueDate', 'colour', 'items')
        #read_only_fields = ('owner')
