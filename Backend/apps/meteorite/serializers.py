from typing import ClassVar

from rest_framework import serializers

from .models import Meteorite


class MeteoriteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Meteorite
        fields = "__all__"
        extra_kwargs: ClassVar[dict[str, dict[str, int]]] = {
            "mass_g": {"min_value": 0},
            "nasa_id": {"min_value": 1},
        }
        
    def validate_name(self, valor):
        if not valor.strip():
            raise serializers.ValidationError("El nombre no se puede quedar vacio.")
        return valor.strip()