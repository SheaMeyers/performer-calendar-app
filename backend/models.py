import random
from django.contrib.auth.models import AbstractUser
from django.db import models


def get_hex_color():
    return f'#{random.randint(1, 255):02X}{random.randint(1, 255):02X}{random.randint(1, 255):02X}'


class User(AbstractUser):
    username = None
    first_name = None
    last_name = None
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Performer(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=280)
    user = models.ManyToManyField(User, related_name='performers')
    hex_color = models.CharField(max_length=7, default=get_hex_color)
