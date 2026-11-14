from django.db.models.aggregates import Avg, Count, Max, Min, Sum

from .models import Meteorite


def filter_meteorites(params):
    qs = Meteorite.objects.all()
    
    recclass = params.get("recclass")
    if recclass:
        qs = qs.filter(recclass__iexact=recclass)
        
    fall = params.get("fall")
    if fall:
        qs = qs.filter(fall__iexact=fall)
    
    year_min = params.get("year_min")
    if year_min and year_min.isdigit():
        qs = qs.filter(year__gte=int(year_min))
        
    year_max = params.get("year_max")
    if year_max and year_max.isdigit():
        qs = qs.filter(year__lte=int(year_max))
    
    return qs

def get_stats(params):
    qs = filter_meteorites(params)

    metrics = qs.aggregate(
        total=Count("id"),
        mass_total=Sum("mass_g"),
        mass_average=Avg("mass_g"),
        mass_max=Max("mass_g"),
        mass_min=Min("mass_g")
    )

    by_class = list(
        qs.values("recclass")
        .annotate(quantity=Count("id"), mass=Sum("mass_g"))
        .order_by("-quantity")[:20]
    )

    by_year = list(
        qs.values("year")
        .annotate(quantity=Count("id"), mass=Sum("mass_g"))
        .order_by("-year")
    )

    by_fall = list(
        qs.values("fall")
        .annotate(quantity=Count("id"))
    )

    return {
        "metrics": metrics,
        "by_class": by_class,
        "by_year": by_year,
        "by_fall": by_fall
    }