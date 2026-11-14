# METEORITE

Aplicación web para explorar y analizar **45.716 registros de meteoritos de la NASA**. Integra una API REST desarrollada con Django REST Framework y un panel interactivo construido con React y TypeScript, con herramientas de búsqueda, filtrado, ordenamiento, paginación y estadísticas dinámicas.

<div align="center">
<h3><font color="white">Deploy Page</font></h3>
<a href="https://meteorite-zg4p.onrender.com/" target="_blank">
  <img src="https://github.com/user-attachments/assets/738bd0ea-75e6-4a94-90cd-513d9c18eadf" width="100" height="100" alt="SprintHub Deploy" />
</a>
</div>

## Tecnologías

- **Backend:** Python, Django y Django REST Framework.
- **Frontend:** React y TypeScript.
- **Base de datos:** PostgreSQL (Supabase).
- **Estilos:** CSS.
- **Despliegue:** Render.
- **Herramientas:** Vite, Gunicorn y WhiteNoise.

## Estructura del proyecto

```text
Meteorite/
├── backend/
│   ├── config/                 
│   ├── apps/
│   │   └── meteorite/          
│   │       ├── models.py
│   │       ├── services.py
│   │       ├── selectors.py
│   │       ├── serializers.py
│   │       ├── views.py
│   │       └── urls.py
│   ├── frontend_build/         
│   ├── manage.py
│   ├── requirements.txt
│   └── build.sh
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── styles/
    │   ├── components/
    │   └── features/
    ├── package.json
    └── vite.config.ts
```

El backend organiza la lógica mediante modelos, servicios, selectores, serializadores y vistas. El frontend utiliza una estructura basada en funcionalidades para separar sus componentes y responsabilidades.

## Instalación y ejecución

**Requisitos:** Python 3.13+, Node.js y npm.

```bash
# Clonar el repositorio
git clone URL_DEL_REPOSITORIO
cd Meteorite

# Backend
cd backend
python -m venv venv
pip install -r requirements.txt

# Configurar variables de entorno en .env
python manage.py migrate
python manage.py runserver
```

En otra terminal, iniciar el frontend:

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

## Funcionalidades principales

- Exploración de registros de meteoritos de la NASA.
- Búsqueda, filtros y ordenamiento de datos.
- Paginación de resultados.
- Estadísticas dinámicas según los filtros aplicados.
- API REST para consultar y gestionar registros.
- Autenticación mediante tokens.
- Panel interactivo con acceso de invitado.

## Despliegue

El proyecto utiliza **Render** para alojar la aplicación y **Supabase** para gestionar PostgreSQL. En producción, el frontend compilado se sirve directamente desde Django, centralizando la aplicación en un mismo origen.

**Base de datos:** PostgreSQL · Supabase  
**Hosting:** Render
