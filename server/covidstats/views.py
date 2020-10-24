'''
Contains information on the views that requests go to when accessing the API.
'''
from datetime import datetime, timezone
import requests

from rest_framework_mongoengine import viewsets
from rest_framework.views import status
from rest_framework.response import Response

from .serializers import CovidSerializer
from .models import CovidInformation

# Update the model every 6 hours
UPDATE_TIME = 432000
updatedTime = datetime.now(timezone.utc)


def update_model():
    '''
    Updates the objects in the CovidInformation Document by grabbing
    information from the API.
    '''
    CovidInformation.objects.all().delete()
    locations = {'Australia', 'USA', 'UK', 'Canada', 'France', 'India',
                 'Brazil', 'Russia', 'Mexico', 'South Africa', 'Germany',
                 'Sweden', 'Turkey', 'Italy'}
    # Loop through each location and grav new information from the API.
    for loc in locations:
        update = requests.get(f'https://coronavirus-19-api.herokuapp.com/countries/{loc}/').json()
        for key, value in update.items():
            # Update the value so that a 0 is stored in place of None.
            if value is None:
                update[key] = 0
        try:
            obj = CovidInformation.objects.create(**update)
            obj.save()
        except:  # If the object fails to create, do nothing
            pass


class CovidViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for gathering latest covid data for Australia
    """
    update_model()
    updatedTime = datetime.now(timezone.utc)
    lookup_field = 'country'
    queryset = CovidInformation.objects.all()
    serializer_class = CovidSerializer

    # Custom get_object to return object by country
    def get_object(self):
        country = CovidInformation.objects.get(country=self.kwargs['country'])
        return country

    # Custom retrieve to update the model at a certain time
    def retrieve(self, request, *args, **kwargs):
        # Update CovidInformation after 6 hours
        if (datetime.now(timezone.utc) - updatedTime).seconds > UPDATE_TIME:
            update_model()
        try:
            instance = self.get_object()
        except (CovidInformation.DoesNotExist, KeyError):
            # Return an error if the object does not exist
            return Response({"error": "Item does not exist"},
                            status=status.HTTP_404_NOT_FOUND)
        ser = CovidSerializer(instance)
        return Response(ser.data)
