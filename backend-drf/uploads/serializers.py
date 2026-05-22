from rest_framework import serializers
from .models import Uploads


class UploadFileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    file = serializers.FileField(required=True)
    access_key = serializers.CharField(required=True)
    class Meta:
        model = Uploads
        fields = ['user_id', 'username', 'file', 'title', 'caption', 'file_type', 'access_key', 'share_token']
        read_only_fields = ['file_type', 'share_token']
    
    def validate(self, data):
        file = data.get('file')
        
        if file:
            name = file.name.lower()
            
            if name.endswith('.pdf'):
                data['file_type'] = 'pdf'
            elif name.endswith('.zip'):
                data['file_type'] = 'zip'
            elif name.endswith(('.png', '.jpg', '.jpeg', '.gif')):
                data['file_type'] = 'image'
            else:
                raise serializers.ValidationError("Unsupported file type")
        
        return data


class ListUploadsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Uploads
        fields = ['id', 'file', 'file_type', 'title', 'caption', 'created_at', 'share_token']


class EditAccessKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = Uploads
        fields = ['id', 'title', 'file', 'created_at', 'share_token', 'access_key']
        read_only_fields = ['title', 'file', 'share_token', 'created_at']
        

class AccessSharedFileSerializer(serializers.Serializer):
    share_token = serializers.CharField()
    access_key = serializers.CharField()