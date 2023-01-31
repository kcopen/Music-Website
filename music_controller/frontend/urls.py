from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('join_room', index),
    path('create_room', index),
    path('room/<str:roomCode>', index)
]
