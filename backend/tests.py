from django.test import TestCase
from django.urls import reverse
from rest_framework.authtoken.models import Token

from backend.models import User, Performer


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

    def test_logout_deletes_token(self):
        logout_url = reverse('rest_logout')
        response = self.client.post(logout_url, HTTP_AUTHORIZATION=f"Token {self.token.key}")

        self.assertEqual(response.status_code, 200)
        self.assertFalse(Token.objects.exists())


class PasswordResetTests(TestCase):

    def setUp(self) -> None:
        self.user = User.objects.create(email='email@email.com')
        self.user.set_password('password')
        self.user.save()

    def test_password_reset_send_email_to_reset_password(self):
        rest_password_url = reverse('rest_password_reset')
        data = {
            'email': self.user.email
        }
        response = self.client.post(rest_password_url, data=data)

        self.assertEqual(response.status_code, 200)


class PasswordChangeTests(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create(email='email@email.com')
        self.user.set_password('password')
        self.user.save()
        self.token = Token.objects.create(user=self.user)

    def test_change_password_changes_password(self):
        rest_password_url = reverse('rest_password_change')
        data = {
            'new_password1': 'newPassword1',
            'new_password2': 'newPassword1',
        }
        response = self.client.post(rest_password_url, data=data, HTTP_AUTHORIZATION=f"Token {self.token.key}")

        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('newPassword1'))
        self.assertFalse(self.user.check_password('password'))


class RegistrationTests(TestCase):

    def test_registration_creates_account(self):
        data = {
            'email': 'email@email.com',
            'password1': 'P@ssword123',
            'password2': 'P@ssword123'
        }
        register_url = reverse('rest_register')
        response = self.client.post(register_url, data=data)

        self.assertEqual(response.status_code, 201)
        self.assertTrue(Token.objects.filter(key=response.json()['key']).exists())
        user = User.objects.get()
        self.assertEqual(user.email, 'email@email.com')
        self.assertTrue(user.check_password('P@ssword123'))

    def test_registration_fails_with_too_common_password(self):
        data = {
            'email': 'email@email.com',
            'password1': 'password',
            'password2': 'password'
        }
        register_url = reverse('rest_register')
        response = self.client.post(register_url, data=data)

        self.assertEqual(response.status_code, 400)

    def test_registration_fails_with_mismatching_password(self):
        data = {
            'email': 'email@email.com',
            'password1': 'P@ssword123',
            'password2': 'P@ssword456'
        }
        register_url = reverse('rest_register')
        response = self.client.post(register_url, data=data)

        self.assertEqual(response.status_code, 400)


class AddPerformerTests(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create(email='email@email.com')
        self.user.set_password('password')
        self.user.save()
        self.token = Token.objects.create(user=self.user)

    def test_add_performer_adds_performer(self):
        add_performer_url = reverse('add_performer')
        data = {
            'id': 1069,
            'name': 'Korn',
        }
        response = self.client.post(add_performer_url, data=data, HTTP_AUTHORIZATION=f"Token {self.token.key}")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.user.performers.count(), 1)


class RemovePerformerTests(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create(email='email@email.com')
        self.other_user = User.objects.create(email='other_email@email.com')
        self.performer = Performer.objects.create(id=1069, name='Korn')
        self.user.performers.add(self.performer)
        self.other_user.performers.add(self.performer)
        self.token = Token.objects.create(user=self.user)

    def test_add_performer_adds_performer(self):
        remove_performer_url = reverse('remove_performer')
        data = {
            'name': 'Korn'
        }
        response = self.client.post(remove_performer_url, data=data, HTTP_AUTHORIZATION=f"Token {self.token.key}")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.user.performers.count(), 0)
        self.assertEqual(self.other_user.performers.count(), 1)


class GetEventsTests(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create(email='email@email.com')
        self.performer = Performer.objects.create(id=1069, name='Korn')
        self.performer_2 = Performer.objects.create(id=1070, name='Slipknot')
        self.user.performers.add(self.performer)
        self.user.performers.add(self.performer_2)
        self.token = Token.objects.create(user=self.user)

    def test_add_performer_adds_performer(self):
        get_events_url = reverse('get_events')
        response = self.client.get(get_events_url, HTTP_AUTHORIZATION=f"Token {self.token.key}")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['performers'], [{'id': 1069, 'name': 'Korn'},
                                                         {'id': 1070, 'name': 'Slipknot'}])
