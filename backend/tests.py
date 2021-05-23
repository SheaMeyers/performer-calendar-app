from django.test import TestCase
from django.urls import reverse
from rest_framework.authtoken.models import Token

from backend.models import User

# TODO Add tests for
#  Sign up/Registration
#  Forgot password
#  Change password


class LoginTests(TestCase):

    def setUp(self) -> None:
        user = User.objects.create(email='email@email.com')
        user.set_password('password')
        user.save()

    def test_successful_login_creates_token_and_returns_it_in_response(self):
        login_url = reverse('rest_login')
        data = {
            'email': 'email@email.com',
            'password': 'password'
        }
        response = self.client.post(login_url, data=data)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(Token.objects.filter(key=response.json()['key']).exists())

    def test_unsuccessful_login_does_not_create_token(self):
        login_url = reverse('rest_login')
        data = {
            'email': 'email@email.com',
            'password': 'wrongpassword'
        }
        response = self.client.post(login_url, data=data)

        self.assertEqual(response.status_code, 400)
        self.assertFalse(Token.objects.exists())


class LogoutTests(TestCase):

    def setUp(self) -> None:
        self.user = User.objects.create(email='email@email.com')
        self.token = Token.objects.create(user=self.user)
        self.client.force_login(self.user)

    def test_logout_deletes_token(self):
        logout_url = reverse('rest_logout')
        response = self.client.post(logout_url)

        self.assertEqual(response.status_code, 200)
        self.assertFalse(Token.objects.exists())
