from django.db import models
import string
import random

#this method generates a random 10 digit code and makes sure they are unique
def generate_roomCode():
  length = 10
  while True:
    roomCode = ''.join(random.choices(string.ascii_uppercase, k=length))
    if Room.objects.filter(roomCode=roomCode).count() == 0: 
      break
  
  return roomCode



# Create your models here.
#All the things that makes up a chatroom goes below
class Room(models.Model):
  roomCode = models.CharField(max_length=10, default="",unique=True)
  host = models.CharField(max_length=50,unique=True)
  guest_pause = models.BooleanField(null=False, default=False)
  votes_skip = models.IntegerField(null=False, default=1)
  created_at = models.DateTimeField(auto_now_add=True)


