from django.shortcuts import render

# Create your views here.
from rest_framework_mongoengine import viewsets
from .models import ListModel
from .serializers import ListSerializer

class ListViewSet(viewsets.ModelViewSet):
    """ API endpoint for interacting with lists
    """
    queryset = ListModel.objects.all()
    serializer_class = ListSerializer
    
    #def update(self, request):
    #    dict = request.data
    #    list, created = ListModel.objects.update_or_create(
    #        idField = dict['idField'],
    #        name = data.get('name', None),
    #        date = data.get('date', None),
    #        dueDate = data.get('dueDate', None),
    #        colour = data.get('colour', None),
    #        items = data.get('items', None)
    #    )
