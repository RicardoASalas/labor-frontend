
#

#### Table of Contents  

- [How to run 馃殌](#How-to-run-)  
- [DB 馃捑](#DB-) 
- [Features 馃捑](#Features-) 

#



<br>

# 驴Qu茅 es? 馃憖

Es una web app para buscar y ofertar empleo hecho entre [Adri谩n](https://github.com/Icaruk) y [Ricardo](https://github.com/ricardoasalas/) que usa:

- Frontend: 馃寣 React 16 + Redux
- Backend: 馃煡 Laravel
- DB: 馃惉 MySQL 

Durante el desarrollo hemos usado [este tabl贸n de Trello](https://trello.com/b/woC9Ld5F/labor).


<br>

# C贸mo lanzarlo 馃殌

- Descargar [backend repo](https://github.com/Icaruk/monetae-b).
- Descargar [frontend repo](https://github.com/Dave86dev/monetae-f).
- En el the backend ejecutar:
	- `node app.js`
- En el the frontend ejecutar:
	- `set PORT=3005 && react-scripts start`
- Deber铆a abrirse en http://localhost:3005/


<br>

# DB 馃捑

Esquema DB
![](https://trello-attachments.s3.amazonaws.com/5e1f276fc18d582b4781c087/5e1f2b421e713d2edba92b62/f0bc934223ffd03c6188672142cd7e85/Untitled_Diagram.jpg)


<br>



# Features 馃搩

- Homepage:
	- Bloque empresas l铆deres
	- Bloque ciudades importantes
	- Sectores con m谩s oportunidades
	![](https://i.gyazo.com/fcbf92411d12fbc26a53762d8d7bb206.jpg)
	![](https://i.gyazo.com/01343b8fe6fe27328502f4311e05f480.png)
	
- Acceso:
	- Registro como empresa o empleado
	- Login
	![](https://i.gyazo.com/5561a7f86a2291d1d9c97e2191409311.png)
	![](https://i.gyazo.com/e3e8e1ea352225630cfd826282a4b0f8.png)

- Perfil
	- De empresa o de empleado
	- Visualizaci贸n y edici贸n de informaci贸n personal, habilidades, descripci贸n, t铆tulo, sector, ofertas.
	![](https://i.gyazo.com/d51f3ef33095f6a42c54cbfbd4d91eeb.png)

- Ofertas
	- S贸lo una empresa puede crear una oferta de empleo.
	- T铆tulo, sector, habilidades requeridas, descripci贸n, salario, jornada, tipo de contrato...
	- Vista detalle de la oferta.
	- Personas inscritas a la oferta de empleo, s贸lo visible por el creador.
	- Bot贸n de eliminaci贸n de oferta, s贸lo visible por el creador.
	- Gesti贸n de candidatos, s贸lo visible por el creador.
	- Bot贸n de inscripci贸n a la oferta, s贸lo visible por empleados.
	![](https://i.gyazo.com/91095499eef62575e6c0839fc3061dd9.png)

- B煤squeda
	- Un s贸lo input de texto busca por t铆tulo, empresa, sector y descripci贸n.
	- Dropdown para filtrar por provincia.
	- Ordenar oferta por fecha o popularidad.
	![](https://i.gyazo.com/2e74f20d78210843b613a2eb47aa640c.png)

<br>

# [馃 TOP 馃](#Table-of-Contents)  
