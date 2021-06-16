from django.conf.urls import url
from django.urls import include, path

from .views import PasswordResetConfirmView, SearchPerformers, AddPerformer, RemovePerformer, GetInfo, GetEvents

urlpatterns = [
    url(r'^search-performers/', SearchPerformers.as_view(), name='search_performers'),
    url(r'^add-performer/', AddPerformer.as_view(), name='add_performer'),
    url(r'^remove-performer/', RemovePerformer.as_view(), name='remove_performer'),
    url(r'^get-info/', GetInfo.as_view(), name='get_info'),
    url(r'^get-events/', GetEvents.as_view(), name='get_events'),

    url(r'^rest-auth/', include('rest_auth.urls'), name='rest_auth'),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls'), name='rest_auth_authentication'),

    # Override Django's default view to direct into React view
    path('reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    url(r'^', include('django.contrib.auth.urls')),
]
