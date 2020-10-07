from rest_framework_mongoengine import viewsets

from.models import LiveTime
from .serializers import LiveTimeSerializer

class LiveTimesViewSet(viewsets.ReadOnlyModelViewSet):
    '''
    Contains information about the live times and popular times of a venue.
    '''

    lookup_field = 'place_id'
    serializer_class = LiveTimeSerializer
    queryset = LiveTime.objects.all()