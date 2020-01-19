
import React, {  } from "react";

import "./login.scss";

import TextField from "@material-ui/core/TextField";
import { FormControl, Button } from '@material-ui/core';
import { validate, session, getUrl } from "../../utils/uti"
import axios from "axios";
import ImageLabor from "../../components/image/image";


export default class Login extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			
			
		};
		
	};
	
	
	
	inputToStatus = (ev, stateKey) => {
		this.setState({ [stateKey]: ev.target.value });
	};
	
	
	
	send = async () => {
		
		let validation;
		let correct = true;
		
		
		// Validación
		validation = validate(this.state.username, "abc123", 4, false, 12);
		if (!! validation) { correct = false };
		this.setState({ err_username: validation });
		
		validation = validate(this.state.password, "abc123!", 4);
		if (!! validation) { correct = false };
		this.setState({ err_password: validation });
		
		
		// Exit?
		if (! correct) return;
		
		
		// Axios
		try {
			
			// Llamada
			let loginData = {
				username: this.state.username,
				password: this.state.password
			};
			
			let res = await axios.post( getUrl("/user/login"), loginData);
			let data = res.data;
			
			
			// Guardo datos de sesión
			session.set({
				username: data.username,
				userId: data.userId,
				token: data.token,
				userType: data.userType
			});
			
			
			// Muestro
			// this.muestraError("Accediendo...", 2, false);
			
			
			// Digo que estoy logeado
			// login(true);
			
			
			// Redirección
			this.props.history.push("/");
			
			
		} catch (err) {
			
			let res = err.response.data;
			
			
			if (res.errorCode === "user_login_2") {
				
				// Guardo datos de sesión
				session.set({
					username: res.username,
					userId: res.userId,
					token: res.token,
					userType: res.userType
				});
				
				
				// Muestro mensaje
				// this.muestraError("Ya estabas logeado.", 2);
				
				
				// Digo que estoy logeado
				// login(true);
				
				
				// Redirijo
				setTimeout( () => {
					this.props.history.push("/");
				}, 2000);
				
				
				return;
				
			};
			
		};
		
		
		
	};
	
	
	
	c_input = (label, type, stateKey) => {
		
		let errTxt = this.state?.[`err_${stateKey}`];
		let err = !! errTxt;
		
		
		return (
			
			<FormControl className="mt3">
				<TextField
					error={ err }
					helperText={ errTxt }
					// id="outlined-basic"
					type={type}
					label={label}
					variant="outlined"
					onChange={ (ev) => this.inputToStatus(ev, stateKey) }
					value={this.state[stateKey] ? this.state[stateKey] : ""}
				/>
			</FormControl>
			
		);
		
	};
	
	
	
	render() {
		
		return (
			<div className="loginMain">
				<form className="br mt5">
					
					<div className="boxImg">
						<ImageLabor
							className="img"
							src="https://trello-attachments.s3.amazonaws.com/5e1f2e19295ba37cfa41ebe6/1000x1000/8f347b573dc849fc8e5d6771afad8307/labor.png"
							w={8}
							alt="logo"
							measure="em"
						/>
					</div>
					
					<div className="titulo mb2">
						
						<h2> Acceso </h2>
						
					</div>
					
					
					{ this.c_input("Nombre de usuario", "text", "username") }
					{ this.c_input("Contraseña", "password", "password") }
					
					
					<Button className="mt3" variant="contained" color="primary"
						onClick={ () => this.send() }
					>
						Acceder
					</Button>
					
				</form>
			</div>
			
		);
	
	};
}
