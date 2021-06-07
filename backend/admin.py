from django.contrib import admin

from .models import User, Performer


class PerformerInline(admin.TabularInline):
    model = Performer.user.through
    extra = 0


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email',)
    search_fields = ('email',)
    fields = ('email', 'date_joined', 'last_login', )
    inlines = [PerformerInline]


@admin.register(Performer)
class PerformerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)
    search_fields = ('id', 'name',)
    filter_horizontal = ('user',)
