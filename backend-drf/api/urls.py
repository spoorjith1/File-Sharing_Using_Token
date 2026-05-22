from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users import views as UserViews
from uploads import views as UploadViews


urlpatterns = [
    path('register/', UserViews.RegistrationView.as_view(), name='user_register'),
    
    path('token/', TokenObtainPairView.as_view(), name='login_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='login_refresh_token'),
    
    path('profile/me/', UserViews.ProfileView.as_view(), name='my_profile'),
    
    path('upload/', UploadViews.UploadFileView.as_view(), name='upload_file'),
    
    path('file/<int:pk>/', UploadViews.GetUploadView.as_view(), name='get_file'),
    
    path('shared-file/', UploadViews.ViewAndDownloadSharedFileView.as_view(), name='shared_file'),
    
    path('file/delete/<int:id>/', UploadViews.DeleteUploadView.as_view(), name='delete_upload'),
]