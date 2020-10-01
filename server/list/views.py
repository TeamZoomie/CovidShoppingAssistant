from rest_framework_mongoengine import viewsets
from rest_framework.views import status
from rest_framework.response import Response

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
            
        
            
            
        #elif request.method == 'POST':
            # Decide whether to create or update list
            #updatedLi
            #list, created = ListModel.objects.update_or_create(
                #idField = kwargs['idField'],
            #    defaults = {''}
            #)
        
    #def update(self, request, *args, **kwargs):
    #    try:
    #        instance = self.get_object()
    #    except(ListModel.DoesNotExist, KeyError):
        #    return Repsonse({"error": ""})
