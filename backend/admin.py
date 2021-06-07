from django.contrib import admin

from .models import User, Performer


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email',)
    search_fields = ('email',)


@admin.register(Performer)
class PerformerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)
    search_fields = ('id', 'name',)
