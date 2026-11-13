from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Meteorite(models.Model):
    
    class TipoNombre(models.TextChoices):
        VALID = "Valid"
        RELICT = "Relict"
    
    class TipoHallazgo(models.TextChoices):
        FELL = "Fell"
        FOUND = "Found"
    
    nasa_id = models.PositiveIntegerField(verbose_name="Id_NASA", unique=True)
    name = models.CharField(verbose_name="nombre", max_length=120)
    nametype = models.CharField(verbose_name="tipo de registro", max_length=10,choices=TipoNombre.choices, default=TipoNombre.VALID)
    recclass = models.CharField(verbose_name="clase", max_length=60, db_index=True)
    mass_g = models.DecimalField("masa(g)", max_digits=12, decimal_places=2, null=True, blank=True,)
    fall = models.CharField("forma_de_hallazgo", max_length=10, choices=TipoHallazgo.choices, default=TipoHallazgo.FOUND)
    year = models.PositiveSmallIntegerField("año", null=True, blank=True, db_index=True)
    reclat = models.DecimalField("latitud", max_digits=9, decimal_places=6, null=True, blank=True, validators=[MinValueValidator(-90), MaxValueValidator(90)])
    reclong = models.DecimalField("longitud", max_digits=9, decimal_places=6, null=True, blank=True, validators=[MinValueValidator(-180), MaxValueValidator(180)])
    
    class Meta:
        verbose_name = "meteorito"
        verbose_name_plural = "meteoritos"
        ordering = ("-year", "name")
        
    def __str__(self):
        return f"{self.name} ({self.recclass})"