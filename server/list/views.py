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
    
    def get_object(self):
        list = ListModel.objects.get(idField=self.kwargs['idField'])
        return list

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except StopIteration:
            pass
        except (ListModel.DoesNotExist, KeyError):
            return Response({"error": "List does not exist"}, status=status.HTTP_404_NOT_FOUND)
        ser = ListSerializer(instance)
        return Response(ser.data)

    def create(self, request, *args, **kwargs):
        instance = request.data
        idNumber = get_next_id_number()
        try: 
            newList = ListModel.objects.create(
                idField = idNumber,
                owner = request.user,
                name = instance['name'],
                date = instance['date'],
                dueDate =instance['dueDate'],
                colour = instance['colour'],
                items = instance['items'],
            )
        except:
            return Response({"error": "An error has occured"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"Success": f"{idNumber}"}, status=status.HTTP_201_CREATED)
        
        
    def patch(self, request, *args, **kwargs):
        try:
            list = ListModel.objects.get(idField=request.data['idField'])
        except StopIteration:
            pass
        except (ListModel.DoesNotExist, KeyError):
            return Response({"error": "List does not exist"}, status=status.HTTP_404_NOT_FOUND)
        ser = ListSerializer(list, data=request.data, partial=True)
        if ser.is_valid():
            ser.save()
            return Response({"Okay": "List updated"}, status=status.HTTP_202_ACCEPTED)
        return Response({"error": "Wrong parameters"}, status=status.HTTP_400_BAD_REQUEST)

# Find next available ID number
def get_next_id_number():#
    counter = 0
    while True:
        if ListModel.objects.filter(idField=counter):
            counter = counter + 1
        else:
            return counter