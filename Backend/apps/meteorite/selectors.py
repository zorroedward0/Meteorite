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