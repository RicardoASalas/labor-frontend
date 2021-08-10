import { Workday } from "./const";
import axios from "axios";

// Import de todo:
// 	import * from "./utils/uti"



/*
	Almacena u obtiene los datos de sesión en el siguiente formato:
		{
			username: "",
			userId: "",
			token: "",
			userType: 0
		}
	
	Import:
		import { session } from "./utils/uti"
	
	Ejemplos:
		session.get(); 		// Devuelve el objeto con datos o NULL si NO estás logeado
		session.set({		// Metes los datos para guardar en localStorage
			username: "Icaruk",
			userId: "56785675",
			token: "8765867586745",
			userType: 0
		});	
	
*/

export const session = {
	
	get: () => {
		return JSON.parse( localStorage.getItem("sessionData") );
	},
	
	set: (data) => {
		localStorage.setItem ("sessionData", JSON.stringify(data) );
	},
	
	del: () => {
		localStorage.removeItem("sessionData");
	},
	
};



/*
	Forma una URL apuntando a la API.
	
	Params:
		route: STRING - Ruta a la que se quiere llamar.
		incudeToken: BOOL (opc) - Si es true se añadirá "token={token}" al final del string de route.
		
	Import:
		import { getUrl } from "./utils/uti"
	
	Ejemplos:
		getUrl(); 				// Devuelve http://localhost:3000	
		getUrl("/user/login"); 	// Devuelve http://localhost:3000/user/login	
		getUrl("/user/asd?", true); 	// Devuelve http://localhost:3000/asd?token=123h1u8o93uhe
	
*/

export const getUrl = (route = "", includeToken = false) => {
	
	// let sessionData = session.get();
	let token = "";
	
	if (includeToken) {
		// if (sessionData) {
		// 	token = "token=" + sessionData.token;
		// };
	};
	
	
	return `http://localhost:3000/api${route}${token}`
	
};



/*
	Limita un número por arriba y por abajo.
	
	Return:
		number
		
	Import:
		import { listaCategorias } from "./utils/uti"
	Ejemplo: 	
		uti.minMax (15, 0, 10); // devuelve 10
	.
*/

export const minMax = (n, min, max) => {
	return Math.max (Math.min (n, max), min);
};



/*
	Valida un string y devuelve el mensaje de error.
	Devuelve "" en caso de que la validación sea correcta.
	
	Import:
		import { validate } from "./utils/uti"
	
	Params:
		0 (str): STRING - String a validar.
		1 (type): STRING - Tipo de validación.
		2 (minLength): NUMBER (opc) - Carácteres mínimos que debería tener el string. Usar 0 para no comprobar.
		3 (maxLength): NUMBER (opc) - Carácteres máximos que debería tener el string. Usar 0 para no comprobar.
		4 (flags): STRING (opc) - Flags para poner al regex. Default: "gi".
	
	Tipos de validación:
		email: asd@asd.es
		phone: +34 123-456
		123: 12345
		abc: hola
		abc_: hola adios
		abc123: hola123
		abc123_: hola123 adios456
		123!: 123_$%&
		123!_: 123$ %&456
		abc123!: hola123$%$()=456
		abc123!_: hola123$% adios$()=456
	
	Tipos de flags:
		g: global
		i: ignore case
		m: multiline
	
	Ejemplos:
		validate("asdf", "email", 5); 			// "Tiene que tener 5 caracteres..."
		validate("asdf", "email", 5); 			// "Email inválido."
		validate("asdf@asd.es", "email"); 		// ""
	.
	
*/

/* eslint-disable no-useless-escape */

export const validate = (str = "", type, minLength = 0, maxLenght = 0, flags = "gi") => {
	
	// Pido longitud?
	if (minLength > 0) {
		
		if (str.length === 0) {
			return "No puede estar vacío.";
		};
		
		if (str.length < minLength) {
			return `Tiene que tener mínimo ${minLength} caracteres.`;
		};
	};
	
	if (maxLenght > 0) {
		if (str.length > maxLenght) {
			return `Tiene que tener máximo ${maxLenght} caracteres (${str.length}/${maxLenght}).`;
		};
	};
	
	
	
	// Empiezo validación
	const specialCharacters = ".#·:$%&()?¿!¡@|+_-ºª ";
	const spanishCharacters = "áéíóúñ";
	
	let regex;
	let errorMessage = "";
	
	
	switch (type) {
		
		// Específicos
		case "nif":
			regex = RegExp("^([0-9]{8})([a-z]{1})$", flags);
			errorMessage = "El NIF/NIE no es válido. Ejemplo: 12345678A";
		break;
		
		case "cif":
			regex = RegExp("^([ABCDEFGHJKLMNPQRSUVW]{1})([0-9]{7})([0-9A-J])$", flags);
			errorMessage = "El CIF no es válido. Ejemplo: A1234567B";
		break;
		
		case "email": 
			regex = RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$", flags);
			errorMessage = "El email no es válido.";
		break;
		
		case "phone":
			regex = RegExp("^[0-9()+-\s ]*$", flags);
			errorMessage = "El teléfono no es válido.";
		break;
		case "city":
			regex = RegExp(`^[a-z${spanishCharacters}'\s ]*$`, flags);
			errorMessage = "Sólo puede contener letras y caracteres '`´.";
		break;		
		
		
		// Libres
		case "123":
			regex = RegExp("^[0-9]*$", flags);
			errorMessage = "Sólo puede contener números.";
		break;
		case "123!":
			regex = RegExp(`^[0-9${specialCharacters}]*$`, flags);
			errorMessage = `Sólo puede contener letras los siguientes caracteres especiales: ${specialCharacters} `;
		break;
		case "123!_":
			regex = RegExp(`^[0-9${specialCharacters}\s ]*$`, flags);
			errorMessage = `Sólo puede contener letras, espacios y los siguientes caracteres especiales: ${specialCharacters} `;
		break;
		
		
		
		case "abc":
			regex = RegExp(`^[a-z${spanishCharacters}]*$`, flags);
			errorMessage = "Sólo puede contener letras.";
		break;

		case "abc_":
			regex = RegExp(`^[a-z${spanishCharacters}\s ]*$`, flags);
			errorMessage = "Sólo puede contener letras y espacios.";
		break;
		case "abc123":
			regex = RegExp(`^[a-z${spanishCharacters}0-9]*$`, flags);
			errorMessage = "Sólo puede contener letras y números.";
		break;
		case "abc123_":
			regex = RegExp(`^[a-z${spanishCharacters}0-9\s ]*$`, flags);
			errorMessage = "Sólo puede contener letras, números y espacios.";
		break;
		case "abc123!":
			regex = RegExp(`^[a-z${spanishCharacters}0-9${specialCharacters}]*$`, flags);
			errorMessage = `Sólo puede contener letras, números y los siguientes caracteres especiales: ${specialCharacters} `;
		break;
		case "abc123!_":
			regex = RegExp(`^[a-z${spanishCharacters}0-9${specialCharacters}\s ]*$`, flags);
			errorMessage = `Sólo puede contener letras, números, espacios y los siguientes caracteres especiales: ${specialCharacters} `;
		break;
		
		
		
		default: break;
		
	};
	
	
	
	// Existe regex?
	if (!regex) {
		return "ERROR: regex is nil";
	};
	
	
	// Si la comprobación sale mal, devuelvo el mensaje de error
	if (! regex.test(str) ) {
		return errorMessage;
	};
	
	
	// Ha salido bien, devuelvo ""
	return "";
	
	
};

/* eslint-enable no-useless-escape */



/*
	Convierte un número de más de 3 dígitos en un string que separa las centenas con un punto.
	
	Import:
		import { numToStr } from "./utils/uti"
	
	Ejemplo:
		numToStr(1000);			// "1.000"
		numToStr(1000, ",");	// "1,000"
	.
*/

export const numToStr = (numero, separador = ".") => {
	
	// Existe?
	if (! numero) {
		return 0
	};
	
	
	// Convierto
	let strNum = numero.toString();
	
	
	// Pregunto
	if (strNum.length <= 3) {
		return strNum;
	};
	
	
	// Itero
	let arrNumeros = [];
	let digitos = 0;
	
	for (let _i = strNum.length - 1; _i >= 0; _i --) {
		
		arrNumeros.unshift( strNum.charAt(_i) );
		digitos ++;
		
		if (digitos === 3) {
			if (_i === 0) {break};
			arrNumeros.unshift( separador );
			digitos = 0;
		};
		
	};
	
	
	return arrNumeros.join("");
	
};



/*
	Traductor de código de jornada a jornada.
	
	Import:
		import { translateWorkday } from "./utils/uti";
	
	Ejemplo:
		translateWorkday("mj"); // "Media jornada"
		translateWorkday("jc"); // "Jornada completa"
	.
	
*/


export const translateWorkday = (code) => {
	
	for (let _x of Workday) {
		if (_x[0] === code) return _x[1];
	};
	
};



/*
	Pide datos a la DB y los cachea para que la próxima vez que se necesiten vuelva a pedirlos a la DB.
		
	Import:
		import { cache } from "./utils/uti"


	Params:
		0: callId (STRING) - Identificador único de la llamada.
		1: data (OBJ) - Objeto con los datos necesarios para la llamada de axios.
		2: mode (STRING) - Modo. Default: "search".
		
	Ejemplos:
		cache("appliedOffers", {uid: "asd"});		// Busca en caché y si no lo encuentra, hace llamada y almacena en caché.
		cache("appliedOffers", {}, "fresh");		// Omite la búsqueda en caché, haciendo la llamada y almacenándola directamente.
		cache("appliedOffers", {}, "save");			// Almacena en caché los datos.
	
	Modos:
		search (default): Busca en caché, luego llama a la API.
		fresh: Omite la búsqueda en caché para llamar a la API directamente.
		save: Almacena en caché el objeto del parámetro "data".
	
	.
	
*/

export const cache = async (callId, data, mode = "search") => {
	
	let cacheId = `cache_${callId}`;
	
	
	// Busco en caché primero
	if (mode === "search") {
		let cache = localStorage.getItem(cacheId);
		if (cache) return JSON.parse(cache);
	};
	
	
	
	// Llamo a la API
	const objCall = {
		
		"appliedOffers": {
			mode: "get",
			url: getUrl(`/offer/applied/${data.uid}`)
		},
		
		
	};
	
	
	let callData = objCall[callId];
	let res = await axios[callData.mode](callData.url);
	
	
	// Guardo en caché
	localStorage.setItem (cacheId, JSON.stringify(res.data) );
	
	
	return res.data;
	
	
	// JSON.parse( localStorage.getItem("asd") );
	// localStorage.setItem ("asd", JSON.stringify(data) );
	// localStorage.removeItem("asd");
	
	
};