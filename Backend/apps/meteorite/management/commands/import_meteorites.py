import time

from django.core.management.base import BaseCommand

from apps.meteorite.services import import_metorites


class Command(BaseCommand):
    help = "Descarga y carga el CSV de la NASA con limpieza incluida."
    
    def add_arguments(self, parser):
        parser.add_argument("route", nargs="?", default=None, help="Ruta opcional a un CSV local.")
        parser.add_argument("--limit",type=int, default=None, help="Cantidad opcional de registros a inyectar.")
        
    def handle(self, *args, **options):
        inicio = time.perf_counter()
        informe = import_metorites(route_csv=options["route"], limit=options["limit"])
        segundos = time.perf_counter() - inicio
        self.stdout.write(self.style.SUCCESS(
            f"Recibidos: {informe['received']} | "
            f"nuevos: {informe['created']} | "
            f"total en base: {informe['total']} | {segundos:.1f} s"
            ))
