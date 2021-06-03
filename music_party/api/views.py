from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room 
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
# Create your views here.


#API View that lets us view a list of all the different rooms 
class ViewRooms(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

#getting info from the room session
class GetRoom(APIView):
    serializer_class = RoomSerializer
    url_look = 'roomCode'

    def get(self,request,format=None):
        roomCode = request.GET.get(self.url_look)
        print(roomCode)
        if roomCode!=None:
            room = Room.objects.filter(roomCode=roomCode) #figure out which room has our code
            if len(room) > 0:
                #if we have a room 
                info = RoomSerializer(room[0]).data
                info['is_host'] = self.request.session.session_key == room[0].host
                return Response(info,status=status.HTTP_200_OK)
            #we dont have a room
         
            return Response({'Room Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        #no code in url 
        return Response({'Bad Request' : 'Code paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class JoinRoom(APIView):

    url_look = 'roomCode'
    def post(self,request,format=None):
         if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
         roomCode= request.data.get(self.url_look)
         if roomCode!= None:
             room_result = Room.objects.filter(roomCode=roomCode)
             if len(room_result)>0:
                 room = room_result[0]
                 self.request.session['room_code'] = roomCode #tells us user is in room in current session (so they can come back and know what room they are in)
                 return Response({'message': 'Room Joined'}, status=status.HTTP_200_OK)
                            
             return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)


         return Response({"Bad Request": 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)



        


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    def post(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        #if information from post req is valid
        if serializer.is_valid():
            guest_pause= serializer.data.get('guest_pause')
            votes_skip = serializer.data.get('votes_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            
            #we want to update room info else create new room 
            if queryset.exists():
                room = queryset[0]
                room.guest_pause = guest_pause
                room.votes_skip = votes_skip
                room.save(update_fields=['guest_pause', 'votes_skip'])
                self.request.session['room_code'] = room.roomCode #tells us user is in room in current session (so they can come back and know what room they are in)
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

            else:
                room = Room(host=host, guest_pause=guest_pause, votes_skip=votes_skip)
                room.save()
                self.request.session['room_code'] = room.roomCode
            
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

            #let user know room was created
                
                
#check to see if the user is already in room. if they are we can use this method to put them in the room when we load our site
class CheckUserInRoom(APIView):
 def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {
            'code': self.request.session.get('room_code')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)



class LeaveRoom(APIView):
    def post(self,request, format=None):
        if 'room_code' in self.request.session:
           self.request.session.pop("room_code")
           host_id  = self.request.session.session_key
           room_results = Room.objects.filter(host=host_id)
           #delete the room if the host decides to leave it then delete room
           if len(room_results) > 0:
               room = room_results[0]
               room.delete()

        return Response({"Message" : "Sucesss"}, status= status.HTTP_200_OK)

        






