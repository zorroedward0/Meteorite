from django.contrib import admin

from .models import Meteorite


@admin.register(Meteorite)
class MeteoriteAdmin(admin.ModelAdmin):
    list_display = ("nasa_id", "name", "recclass", "mass_g", "fall", "year")
    search_fields = ("name", "recclass")
    list_filter = ("fall", "nametype")
    list_per_page = 50
