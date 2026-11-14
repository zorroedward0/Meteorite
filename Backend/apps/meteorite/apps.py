import os
import threading
import time
import urllib.request

from django.apps import AppConfig


class MeteoriteConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.meteorite"

    def ready(self):
        if os.environ.get("RUN_MAIN") != "true" and os.environ.get("DEBUG", "False") == "True":
            return

        def self_ping():
            time.sleep(30)
            url = os.environ.get("SERVER_URL")

            if not url:
                print("Self-ping desactivado: No se encontró SERVER_URL.")
                return

            while True:
                try:
                    with urllib.request.urlopen(url, timeout=10) as response:
                        print(f"Self-ping exitoso: Código {response.getcode()}")
                except Exception as e:
                    print(f"Error en el self-ping: {e}")

                time.sleep(14 * 60)

        hilo = threading.Thread(target=self_ping, daemon=True)
        hilo.start()
