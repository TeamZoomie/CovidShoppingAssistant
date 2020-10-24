'''
Contains the view of the default application.
The purpose of this view is to redirect requestors to the github page which
hosts the code for the project.
'''
from django.shortcuts import redirect


def redirect_view(request):
    # Simple view which redirects requests to a github link
    response = redirect('https://github.com/TeamZoomie/CovidShoppingAssistant')
    return response
