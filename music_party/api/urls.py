from django.urls import path
from .views import ViewRooms

urlpatterns = [
    path('room', ViewRooms.as_view()),
]
