from django.urls import path
from .views import AuthURL

urlpatterns = [
    path('get_auth_url', AuthURL.as_view()),
]
