from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, RoomJoinView

urlpatterns = [
    path('home', RoomView.as_view()),
    path('create_room', CreateRoomView.as_view()),
    path('get_room', GetRoom.as_view()),
    path('join_room', RoomJoinView.as_view()),
]
