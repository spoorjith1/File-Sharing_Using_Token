from django.db import models
from users.models import User
import uuid


class Uploads(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploads')
    title = models.CharField(max_length=40)
    FILE_TYPES = (('image', 'Image'),
                  ('zip', 'Zip'),
                  ('pdf', 'PDF'),)
    file = models.FileField(upload_to='uploads/')
    caption = models.CharField(max_length=255, null=True, blank=True)
    file_type = models.CharField(max_length=20 ,choices=FILE_TYPES, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    access_key = models.CharField(max_length=20)
    share_token = models.UUIDField(default=uuid.uuid4, unique=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.title}"