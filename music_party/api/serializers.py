#This code will translate the models.py file into a JSON Response which is easy for us to read and do things with 
from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
  class Meta:
    model = Room
    fields = ('id', 'roomCode','host','guest_pause','votes_skip','created_at')
    

 