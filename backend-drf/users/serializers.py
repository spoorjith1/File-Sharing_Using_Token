from rest_framework import serializers
from .models import User
from uploads.models import Uploads
from uploads.serializers import ListUploadsSerializer

class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'passowrd'})
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']
    
    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("email already exists")
        return value
    
    def validate_username(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("username already exists")
        return value
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class ProfileViewSerializer(serializers.ModelSerializer):
    uploads = ListUploadsSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'profile_pic', 'first_name', 'last_name', 'uploads']