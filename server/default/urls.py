'''
Contains information to redirect requests to the correct view.
'''
from django.urls import path
from . import views

# As there is only one view, all requests get sent to redirect_view
urlpatterns = [
    path('', views.redirect_view)
]
