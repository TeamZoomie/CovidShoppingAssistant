from django.urls import include, path
from rest_framework_mongoengine import routers
from . import views

urlpatterns = [
    path('', views.UserCreate.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework_userlogin'))
]