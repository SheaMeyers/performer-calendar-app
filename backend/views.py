from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from django.utils.decorators import method_decorator
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.views.decorators.cache import never_cache
from django.views.decorators.debug import sensitive_post_parameters

from rest_framework.authtoken.models import Token
from rest_framework.views import APIView


UserModel = get_user_model()


class PasswordResetConfirmView(APIView):

    @method_decorator(sensitive_post_parameters())
    @method_decorator(never_cache)
    def dispatch(self, *args, **kwargs):
        assert 'uidb64' in kwargs and 'token' in kwargs
        uid = urlsafe_base64_decode(kwargs['uidb64']).decode()
        user = UserModel._default_manager.get(pk=uid)
        user.set_unusable_password()
        user.save()
        token, _ = Token.objects.get_or_create(user=user)
        return redirect(f'/update-password?token={urlsafe_base64_encode(bytes(token.key, encoding="UTF-8"))}')
