from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UploadFileSerializer, ListUploadsSerializer, AccessSharedFileSerializer, EditAccessKeySerializer
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from .models import Uploads


class UploadFileView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = UploadFileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ViewAndDownloadSharedFileView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = AccessSharedFileSerializer(data=request.data)
        if serializer.is_valid():
            share_token = serializer.validated_data['share_token']
            access_key = serializer.validated_data['access_key']
            
            try:
                upload = Uploads.objects.get(share_token=share_token)
                if upload.access_key != access_key:
                    return Response({"error": "Invalid access key"}, status=status.HTTP_400_BAD_REQUEST)
                
                return Response({
                    'file_url': request.build_absolute_uri(upload.file.url),
                    'title': upload.title
                })
            except Uploads.DoesNotExist:
                return Response({"error": "Invalid share token"}, status=status.HTTP_404_NOT_FOUND)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUploadView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ListUploadsSerializer
    
    def get_queryset(self):
        return Uploads.objects.filter(user=self.request.user)


class EditAccessKeyView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EditAccessKeySerializer
    
    def get_queryset(self):
        return Uploads.objects.filter(user=self.request.user)


class DeleteUploadView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ListUploadsSerializer
    
    def get_queryset(self):
        return Uploads.objects.filter(user=self.request.user)