from rest_framework_mongoengine import viewsets

from .models import ListModel
from .serializers import ListSerializer


class ListViewSet(viewsets.ModelViewSet):
    '''
    Contains information about inputs/outputs of a single program
    that may be used in Universe workflows.
    '''
    lookup_field = 'idField'
    serializer_class = ListSerializer
    queryset = ListModel.objects.all()
    
