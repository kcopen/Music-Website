from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, RoomJoinView, UserInRoom, LeaveRoom, UpdateRoom

urlpatterns = [
    path('home', RoomView.as_view()),
    path('create_room', CreateRoomView.as_view()),
    path('get_room', GetRoom.as_view()),
    path('join_room', RoomJoinView.as_view()),
    path('user_in_room', UserInRoom.as_view()),
    path('leave_room', LeaveRoom.as_view()),
    path('update_room', UpdateRoom.as_view()),
]
