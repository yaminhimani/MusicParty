from django.urls import path
from .views import ViewRooms, CreateRoomView, GetRoom

urlpatterns = [
    path('room', ViewRooms.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
]
