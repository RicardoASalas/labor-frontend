
#

#### Table of Contents  

- [How to run 🚀](#How-to-run-)  
- [DB 💾](#DB-) 
- [Backend 🔙](#Backend-) 
	- [User endpoints](#USER)
	- [Product endpoints](#MOVIE)

- [Frontend (preview) 👁‍🗨](#Frontend-)  

#



<br>

# ¿Qué es? 👀

Es una web app para buscar y ofertar empleo hecho entre [Adrián](https://github.com/Icaruk) y [Ricardo](https://github.com/ricardoasalas/) que usa:

- Frontend: 🌌 React 16 + Redux
- Backend: 🟥 Laravel
- DB: 🐬 MySQL 

Durante el desarrollo hemos usado [este tablón de Trello](https://trello.com/b/woC9Ld5F/labor).


<br>

# Cómo lanzarlo 🚀

- Descargar [backend repo](https://github.com/Icaruk/monetae-b).
- Descargar [frontend repo](https://github.com/Dave86dev/monetae-f).
- En el the backend ejecutar:
	- `node app.js`
- En el the frontend ejecutar:
	- `set PORT=3005 && react-scripts start`
- Debería abrirse en http://localhost:3005/


<br>

# DB 💾

Esquema DB
![](https://trello-attachments.s3.amazonaws.com/5e1f276fc18d582b4781c087/5e1f2b421e713d2edba92b62/f0bc934223ffd03c6188672142cd7e85/Untitled_Diagram.jpg)


<br>



# Features 📃

- Homepage:
	- Bloque empresas líderes
	- Bloque ciudades importantes
	- Sectores con más oportunidades
	![]()
	
- Acceso:
	- Registro como empresa o empleado
	- Login

- Perfil
	- De empresa o de empleado
	- Visualización y edición de información personal, habilidades, descripción, título, sector, ofertas.

- Ofertas
	- Sólo una empresa puede crear una oferta de empleo.
	- Título, sector, habilidades requeridas, descripción, salario, jornada, tipo de contrato...
	- Vista detalle de la oferta.
	- Personas inscritas a la oferta de empleo, sólo visible por el creador.
	- Botón de eliminación de oferta, sólo visible por el creador.
	- Gestión de candidatos, sólo visible por el creador.
	- Botón de inscripción a la oferta, sólo visible por empleados.

- Búsqueda
	- Un sólo input de texto busca por título, empresa, sector y descripción.
	- Dropdown para filtrar por provincia.
	- Ordenar oferta por fecha o popularidad.

<br>

# [🡅 TOP 🡅](#Table-of-Contents)  
