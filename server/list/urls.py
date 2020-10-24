'''
This file is used to direct incoming requests to the correct views.
'''
from django.urls import include, path
from rest_framework_mongoengine import routers
from . import views

router = routers.DefaultRouter()
router.register('', views.ListViewSet, basename='ListModel')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework_list'))
]
