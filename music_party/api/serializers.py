#This code will translate the models.py file into a JSON Response which is easy for us to read and do things with 
from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
  class Meta:
    model = Room
    fields = ('id', 'roomCode','host','guest_pause','votes_skip','created_at')

#check to see if data in post req is valid, and corresponds to what we want to do to create new room
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_pause', 'votes_skip')
 
 
class UpdateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[]) #this is so the code is not unique based on the model. We are changing it here

    class Meta:
        model = Room
        fields = ('guest_pause', 'votes_skip', 'roomCode')