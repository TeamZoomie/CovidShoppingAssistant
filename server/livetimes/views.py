'''
Contains information on the views that requests go to when accessing the API.
Requests get information for the Live data from stores.
'''
from datetime import datetime, timezone
import environ

#https://github.com/GrocerCheck/LivePopularTimes
import livepopulartimes

from rest_framework_mongoengine import viewsets
from rest_framework.views import status
from rest_framework.response import Response

from .models import LiveTime
from .serializers import LiveTimeSerializer

# API key is hidden by using environment variables. Look at .env.example
env = environ.Env()
environ.Env.read_env()
API_KEY = env("GOOGLE_API_KEY")

# Only update the model if it hasn't been updated in 3 hours
UPDATE_TIME = 216000
updatedTime = datetime.now(timezone.utc)

def get_data(placeid):
    '''
    Gets the live data from the API given a PlaceID.
    '''
    instance = livepopulartimes.get_populartimes_by_PlaceID(API_KEY, placeid)

    # Change items from None to 0.
    if instance['current_popularity'] is None:
        instance['current_popularity'] = 0

    livetime = LiveTime.objects.create(
        place_id = instance['place_id'],
        name = instance['name'],
        populartimes = instance['populartimes'],
        current_popularity = instance['current_popularity']
    )
    return livetime


class LiveTimesViewSet(viewsets.ReadOnlyModelViewSet):
    '''
    Contains information about the live times and popular times of a venue.
    '''
    lookup_field = 'place_id'
    serializer_class = LiveTimeSerializer
    queryset = LiveTime.objects.all()

    # Override get_object to return objected based on place_id.
    def get_object(self):
        obj = LiveTime.objects.get(place_id=self.kwargs['place_id'])
        return obj

    # Override retrieve to update the model after a number of hours and to gather
    # information if none exists.
    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            if (datetime.now(timezone.utc) - updatedTime).seconds > UPDATE_TIME:
                # Delete the object if it exists first
                instance.delete()
                instance = get_data(kwargs['place_id'])
        except LiveTime.DoesNotExist: 
            # Get new object
            instance = get_data(kwargs['place_id'])
        except KeyError:
            return Response({"error": "An error has occured"}, status=status.HTTP_400_BAD_REQUEST)
        ser = LiveTimeSerializer(instance)
        return Response(ser.data)