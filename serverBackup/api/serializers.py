from rest_framework import serializers

from .models import Legends

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Legends
        fields = ('name', 'alias')
