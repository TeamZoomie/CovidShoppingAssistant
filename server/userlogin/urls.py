'''
Contains information to direct incoming requests to the correct view.
'''

from django.urls import include, path
from . import views

urlpatterns = [
    path('', views.UserCreate.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework_userlogin'))
]