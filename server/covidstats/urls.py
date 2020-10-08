from django.urls import include, path
from rest_framework_mongoengine import routers
from . import views

router = routers.DefaultRouter()
router.register(r'', views.CovidViewSet, basename='CovidInformation')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
