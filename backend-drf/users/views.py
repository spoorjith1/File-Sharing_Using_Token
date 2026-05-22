from django.shortcuts import render
from .models import User
from rest_framework import generics
from .serializers import UserRegistrationSerializer, ProfileViewSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    

class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileViewSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user