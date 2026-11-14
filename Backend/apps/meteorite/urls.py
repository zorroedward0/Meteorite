from django.urls import include, path, re_path
from django.views.generic import TemplateView
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from .views import MeteoriteViewSet, StatsViewSet

router = DefaultRouter()
router.register(r"meteorites", MeteoriteViewSet, basename="meteorite")

urlpatterns = [
    path("login/", obtain_auth_token, name="login"),
    path("meteorites/stats/", StatsViewSet.as_view(), name="stats"),
    path("", include(router.urls)),

    path("", TemplateView.as_view(template_name="index.html"), name="inicio"),
    re_path(
    r"^(?!api/|admin/|static/).*$",
    TemplateView.as_view(template_name="index.html"),
    name="spa",
    ),

]