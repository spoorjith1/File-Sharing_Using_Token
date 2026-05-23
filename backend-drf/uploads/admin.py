from django.contrib import admin
from .models import Uploads

class UploadsAdmin(admin.ModelAdmin):
    list_display = ['id' ,'user', 'file', 'file_type']
admin.site.register(Uploads, UploadsAdmin)