from django.shortcuts import render
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room 
# Create your views here.


#API View that lets us view a list of all the different rooms 
class ViewRooms(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

