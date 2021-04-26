from django.urls import path
from .views import ViewRooms,CreateRoomView

urlpatterns = [
    path('room', ViewRooms.as_view()),
    path('create-room', CreateRoomView.as_view()),

]
