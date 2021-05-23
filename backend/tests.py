from django.test import TestCase
from django.urls import reverse
from rest_framework.authtoken.models import Token

from backend.models import User

# TODO Add tests for
#  Sign up/Registration
#  Login
#  Logout
#  Forgot password
#  Change password



class LoginTests(TestCase):

    def setUp(self) -> None:
        user = User.objects.create(email='email@email.com')
        user.set_password('password')
        user.save()

    def test_login_works_properly(self):
        login_url = reverse('rest_login')
        data = {
            'email': 'email@email.com',
            'password': 'password'
        }
        response = self.client.post(login_url, data=data)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(Token.objects.filter(key=response.json()['key']).exists())

    def test_login_with_bad_password(self):
        login_url = reverse('rest_login')
        data = {
            'email': 'email@email.com',
            'password': 'wrongpassword'
        }
        response = self.client.post(login_url, data=data)

        self.assertEqual(response.status_code, 400)
        self.assertFalse(Token.objects.exists())
