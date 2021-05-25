from django.urls import path
from .views import JoinRoom, ViewRooms, CreateRoomView, GetRoom, JoinRoom

urlpatterns = [
    path('room', ViewRooms.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
]
