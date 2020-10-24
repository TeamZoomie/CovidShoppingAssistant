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
    Is a view that is used to store, update and retrieve lists.
    '''
    lookup_field = 'idField'
    permission_classes = (IsAuthenticated,)
    serializer_class = ListSerializer
    queryset = ListModel.objects.all()

    def get_object(self):
        # Override the get_object function to return items by the idField.
        list = ListModel.objects.get(idField=self.kwargs['idField'])
        return list

    def retrieve(self, request, *args, **kwargs):
        # Override retrieve so it returns a custom error message and
        # exceptions.
        try:
            instance = self.get_object()
            print(instance['ownerToken'])
        except StopIteration:  # Skip over if this error occurs.
            pass
        except (ListModel.DoesNotExist, KeyError):
            # Return an error if the model does not exist.
            return Response({"error": "List does not exist"},
                            status=status.HTTP_404_NOT_FOUND)
        ser = ListSerializer(instance)
        return Response(ser.data)

    def create(self, request, *args, **kwargs):
        # Override create so that it creates a custom list with an custome ID
        # field and custom ownerToken.
        # Returns the created ID field.

        instance = request.data
        id_number = get_next_id_number()
        try:  # Create model with the Authorization token
            newList = ListModel.objects.create(
                idField=id_number,
                ownerToken=request.META.get('HTTP_AUTHORIZATION'),
                name=instance['name'],
                date=instance['date'],
                dueDate=instance['dueDate'],
                colour=instance['colour'],
                items=instance['items'],
            )
        except:  # All errors are met with an error message
            return Response({"error": "An error has occured"},
                            status=status.HTTP_400_BAD_REQUEST)
        return Response({"Success": f"{id_number}"},
                        status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        # Override update so that only users with the correct
        # Authorization token can update the list.
        try:
            obj = self.get_object()
            print(obj['ownerToken'])
            print(request.META.get('HTTP_AUTHORIZATION'))
        except StopIteration:  # Skip if this error occurs.
            pass
        except (ListModel.DoesNotExist, KeyError):
            return Response({"error": "List does not exist"},
                            status=status.HTTP_404_NOT_FOUND)
        if obj['ownerToken'] != request.META.get('HTTP_AUTHORIZATION'):
            # Return Not_Modified if requester is not the owner of the list
            return Response({"error": "Not the owner of the list"},
                            status=status.HTTP_304_NOT_MODIFIED)

        ser = ListSerializer(obj, data=request.data, partial=True)
        if ser.is_valid():
            ser.save()
            return Response({"Okay": "List updated"},
                            status=status.HTTP_202_ACCEPTED)
        return Response({"error": "Wrong parameters"},
                        status=status.HTTP_400_BAD_REQUEST)


def get_next_id_number():
    '''
    Finds the next available ID number
    Gets the next id number by using linear probing.
    '''
    counter = 0
    while True:
        if ListModel.objects.filter(idField=counter):
            counter = counter + 1
        else:
            return counter
