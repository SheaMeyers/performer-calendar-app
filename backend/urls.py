from django.conf.urls import url
from django.urls import include, path

from .views import PasswordResetConfirmView

urlpatterns = [
    url(r'^rest-auth/', include('rest_auth.urls'), name='rest_auth'),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls'), name='rest_auth_authentication'),

    # Override Django's default view to direct into React view
    path('reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    url(r'^', include('django.contrib.auth.urls')),
]
