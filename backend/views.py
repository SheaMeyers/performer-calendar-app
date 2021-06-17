import requests

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import redirect
from django.utils.decorators import method_decorator
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.views.decorators.cache import never_cache
from django.views.decorators.debug import sensitive_post_parameters

from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView

from .models import Performer
from .serializers import SeatGeekPerformerSerializer, SeatGeekEventsSerializer

UserModel = get_user_model()


class PasswordResetConfirmView(APIView):
    # Overrides the default Django view to send the user into our React page

    @method_decorator(sensitive_post_parameters())
    @method_decorator(never_cache)
    def dispatch(self, *args, **kwargs):
        assert 'uidb64' in kwargs and 'token' in kwargs
        uid = urlsafe_base64_decode(kwargs['uidb64']).decode()
        user = UserModel._default_manager.get(pk=uid)
        user.set_unusable_password()
        user.save()
        token, _ = Token.objects.get_or_create(user=user)
        return redirect(f'/update-password?token={urlsafe_base64_encode(bytes(token.key, encoding="UTF-8"))}&email={user.email}')


class SearchPerformers(APIView):

    permission_classes = [AllowAny]

    def post(self, request: Request) -> Response:
        query = request.data.get('query')
        if not query:
            Response(status=200, data=[])

        url = f"https://api.seatgeek.com/2/performers?q={query}&client_id={settings.SEAT_GEEK_CLIENT_ID}"
        response = requests.get(url)

        data = SeatGeekPerformerSerializer(response.json().get("performers", []), many=True).data

        return Response(status=200, data=data)


class AddPerformer(APIView):

    permission_classes = [AllowAny]

    def post(self, request: Request) -> Response:
        data = SeatGeekPerformerSerializer(request.data).data

        # If we know the user then create add to their performers
        # else create a temporary instance for getting events
        if request.user.is_anonymous:
            performer = Performer(**data)
        else:
            performer, _ = Performer.objects.get_or_create(**data)
            request.user.performers.add(performer)

        events = []
        for i in range(1, 100):
            url = f"https://api.seatgeek.com/2/events?" \
                  f"performers.id={performer.id}&" \
                  f"client_id={settings.SEAT_GEEK_CLIENT_ID}&page={i}"
            response = requests.get(url)
            response_data = response.json()
            events += response_data['events']
            if (response_data['meta']['page'] * response_data['meta']['per_page']) > response_data['meta']['total']:
                break

        events_data = SeatGeekEventsSerializer(events, many=True, context={'performer': performer}).data

        data = {
            'performer': SeatGeekPerformerSerializer(performer).data,
            'events': events_data
        }

        return Response(status=200, data=data)


class RemovePerformer(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request: Request) -> Response:
        name = request.data.get('name')

        try:
            performer = Performer.objects.get(name=name)
        except ObjectDoesNotExist:
            # Happens in the case of:
            #  User adds a performer when not logged in, user logs in, user tries to remove performer
            return Response(status=200)

        request.user.performers.remove(performer)

        return Response(status=200)


class GetInfo(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:

        performers = request.user.performers.all()
        performers_data = SeatGeekPerformerSerializer(performers, many=True).data

        events_data = []
        for performer in performers:
            events = []
            for i in range(1, 100):
                url = f"https://api.seatgeek.com/2/events?" \
                      f"performers.id={performer.id}&" \
                      f"client_id={settings.SEAT_GEEK_CLIENT_ID}&page={i}"
                response = requests.get(url)
                response_data = response.json()
                events += response_data['events']
                if (response_data['meta']['page'] * response_data['meta']['per_page']) > response_data['meta']['total']:
                    break

            events_data += SeatGeekEventsSerializer(events, many=True, context={'performer': performer}).data

        data = {
            'performers': performers_data,
            'events': events_data
        }

        return Response(status=200, data=data)
