import csv
import datetime as dt
import io
import urllib.request
from decimal import Decimal, InvalidOperation

from .models import Meteorite

URL_CSV = "https://data.nasa.gov/docs/legacy/meteorite_landings/Meteorite_Landings.csv"
YEAR_MAX = dt.date.today().year
YEAR_MIN = 800

def _to_text(value):
    return str(value or "").strip()

def _to_decimal(value): 
    text = _to_text(value)
    if not text:
        return None
    try:
        return Decimal(text)
    except InvalidOperation:
        return None

def _to_year(value):
    text = _to_text(value)[:4]
    if not text.isdigit():
        return None
    year= int(text)
    if YEAR_MIN <= year <=YEAR_MAX:
        return year
    return None

def _to_cords(value, min_val, max_val):
    number = _to_decimal(value)
    if number is None or not (min_val <= number <= max_val):
        return None
    return number

def row_to_meteorite(row):
    text_id = _to_text(row.get("id"))
    name = _to_text(row.get("name"))
    
    if not text_id.isdigit() or not name:
        return None
    
    masa = _to_decimal(row.get("mass (g)"))
    if masa is not None and masa < 0:
        masa = None 
        
    nametype = _to_text(row.get("nametype"))
    if nametype not in ("Valid", "Relict"):
        nametype = "Valid"
        
    fall = _to_text(row.get("fall"))
    if fall not in ("Fell", "Found"):
        fall = "Found"
    
    return Meteorite(
        nasa_id = int(text_id),
        name= name[:120],
        nametype=nametype,
        recclass = (_to_text(row.get("recclass")) or "Unknown")[:60],
        mass_g=masa,
        fall=fall,
        year= _to_year(row.get("year")),
        reclat = _to_cords(row.get("reclat"), -90, 90),
        reclong = _to_cords(row.get("reclong"), -180, 180)
        )
    
def import_meteorites(route_csv=None, limit=None):
    if route_csv:
        with open(route_csv, encoding="utf-8") as file:
            rows = list(csv.DictReader(file))
    else:
        
        req = urllib.request.Request(
            URL_CSV,
            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
        )
        
        with urllib.request.urlopen(req, timeout=180) as response:
            reader = csv.DictReader(io.TextIOWrapper(response, encoding= "utf-8"))
            rows = list(reader)
            
    viewed = set()
    valids = []
    before = Meteorite.objects.count()
    valid_index = 0 
    
    for row in rows:
        meteorite = row_to_meteorite(row)
        if meteorite is None or meteorite.nasa_id in viewed: 
            continue
        viewed.add(meteorite.nasa_id)
        valid_index += 1
        
        if valid_index <= before:
            continue
        
        valids.append(meteorite)
    
        if limit is not None and len(valids) >= limit:
                break
        
    Meteorite.objects.bulk_create(
        valids, batch_size=1000, ignore_conflicts=True
    )
    after = Meteorite.objects.count()
    
    return{
        "received": len(rows),
        "valids": len(valids),
        "created": after - before,
        "total": after
    }

