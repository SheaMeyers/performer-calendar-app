from django.conf.urls import url
from django.urls import include


urlpatterns = [
    url(r'^rest-auth/', include('rest_auth.urls'), name='rest_auth'),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls'), name='rest_auth_authentication')
]
