
import React from "react";

import "./register.scss";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { FormControl, Button, InputLabel, Input, FormHelperText } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: 200
		}
	}
}));



export default function BasicTextFields() {
	
	// const classes = useStyles();
	
	
	return (
		<div className="registerMain">
			<form className="br mt3">
				<div className="titulo">
					<h2>Registro</h2>
				</div>

				<FormControl className="mt3">
					<TextField id="outlined-basic" label="Nombre de usuario" variant="outlined" />
				</FormControl>

				<FormControl className="mt3">
					<TextField id="outlined-basic" type="email" label="Email" variant="outlined" />
				</FormControl>

				<FormControl className="mt3">
					<TextField id="outlined-basic" type="password" label="Contraseña" variant="outlined" />
				</FormControl>

				<FormControl className="mt3">
					<TextField id="outlined-basic" type="password" label="Repite contraseña" variant="outlined" />
				</FormControl>

				<Button className="mt3" variant="contained" color="primary" >
					Siguiente
				</Button>
				
			</form>
		</div>
	);
}
