from django.urls import path
from .views import JoinRoom, ViewRooms, CreateRoomView, GetRoom, JoinRoom, CheckUserInRoom, LeaveRoom

urlpatterns = [
    path('room', ViewRooms.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', CheckUserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view())

]
