from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from .views import MeteoriteViewSet, StatsViewSet

router = DefaultRouter()
router.register(r"meteorites", MeteoriteViewSet, basename="meteorite")

urlpatterns = [
    path("login/", obtain_auth_token, name="login"),
    path("meteorites/stats/", StatsViewSet.as_view(), name="stats"),
    path("", include(router.urls)),
]