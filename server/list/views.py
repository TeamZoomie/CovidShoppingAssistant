'''
Contains information on the views that requests go to when accessing the API.
Users are able to view, edit, and create lists.
'''
from rest_framework_mongoengine import viewsets
from rest_framework.views import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import ListModel
from .serializers import ListSerializer
from .permissions import IsOwnerOrReadOnly


class ListViewSet(viewsets.ModelViewSet):
    '''
    Contains information about inputs/outputs of a single program
    that may be used in Universe workflows.
    '''
    lookup_field = 'idField'
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)
    serializer_class = ListSerializer
    queryset = ListModel.objects.all()

    # Override the get_object function to return items by the idField.
    def get_object(self):
        list = ListModel.objects.get(idField=self.kwargs['idField'])
        return list

    # Override retrieve so it returns a custom error message and exceptions.
    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except StopIteration: # Skip over if this error occurs.
            pass
        except (ListModel.DoesNotExist, KeyError): 
            # Return an error if the model does not exist.
            return Response({"error": "List does not exist"}, status=status.HTTP_404_NOT_FOUND)
        ser = ListSerializer(instance)
        return Response(ser.data)

    # Override create so that it creates a custom list with an custome ID field and
    # custom ownerToken. Returns the created ID field.
    def create(self, request, *args, **kwargs):
        instance = request.data
        id_number = get_next_id_number()
        try: # Create model with the Authorization token
            newList = ListModel.objects.create(
                idField = id_number,
                ownerToken = request.META.get('HTTP_AUTHORIZATION'),
                name = instance['name'],
                date = instance['date'],
                dueDate =instance['dueDate'],
                colour = instance['colour'],
                items = instance['items'],
            )
        except: # All errors are met with an error message
            return Response({"error": "An error has occured"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"Success": f"{id_number}"}, status=status.HTTP_201_CREATED)   

    # Override update so that only users with the correct Authorization token can
    # update the list.
    def update(self, request, *args, **kwargs):
        try:
            list = ListModel.objects.get(idField=request.data['idField'])
        except StopIteration: # Skip if this error occurs.
            pass
        except (ListModel.DoesNotExist, KeyError):
            return Response({"error": "List does not exist"}, status=status.HTTP_404_NOT_FOUND)
        if list['ownerToken'] != request.META.get('HTTP_AUTHORIZATION'):
            # Return Not_Modified if requester is not the owner of the list
            return Response({"error": "Not the owner of the list"}, status=status.HTTP_304_NOT_MODIFIED)
        
        ser = ListSerializer(list, data=request.data, partial=True)
        if ser.is_valid():
            ser.save()
            return Response({"Okay": "List updated"}, status=status.HTTP_202_ACCEPTED)
        return Response({"error": "Wrong parameters"}, status=status.HTTP_400_BAD_REQUEST)

# Find next available ID number
def get_next_id_number():
    '''
    Gets the next id number by using linear probing.
    '''
    counter = 0
    while True:
        if ListModel.objects.filter(idField=counter):
            counter = counter + 1
        else:
            return counter