from rest_framework import viewsets
from rest_framework.decorators import APIView, action
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Meteorite
from .selectors import filter_meteorites, get_stats
from .serializers import MeteoriteSerializer
from .services import import_meteorites


class MeteoriteViewSet(viewsets.ModelViewSet):

    queryset = Meteorite.objects.all()
    serializer_class = MeteoriteSerializer
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ("name", "recclass")
    ordering_fields = ("year", "mass_g", "name")

    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return [IsAuthenticated()]
        return [AllowAny()]

    def get_queryset(self):
        return filter_meteorites(self.request.query_params)

    @action(detail=False, methods=["get"], url_path="classes")
    def get(self, request):
            classes = list(
                Meteorite.objects.values_list("recclass", flat=True)
                .distinct().order_by("recclass")
                )
            return Response({"classes": classes})

    @action(detail=False, methods=["post"], url_path="load")
    def load(self, request):
        try:
            limit = int(request.data.get("limit"))
        except (TypeError, ValueError):
            limit = None

        if limit is not None and limit <= 0:
            limit = None

        informe = import_meteorites(limit=limit)
        return Response(informe)
class StatsViewSet(APIView):
    def get(self, request):
        return Response(get_stats(request.query_params))

