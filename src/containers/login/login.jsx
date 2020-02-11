
import React, {  } from "react";

import "./login.scss";

import TextField from "@material-ui/core/TextField";
import { FormControl, Button } from '@material-ui/core';
import { validate, session, getUrl, cache } from "../../utils/uti"
import axios from "axios";
import ImageLabor from "../../components/image/image";
import { login } from "../../redux/actions/users";
// import { Link } from "react-router-dom";



export default class Login extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			
			message: "",
			
		};
		
	};
	
	
	
	inputToStatus = (ev, stateKey) => {
		this.setState({ [stateKey]: ev.target.value });
	};
	
	
	
	send = async () => {
		
		let validation;
		let correct = true;
		
		
		// Validación
		validation = validate(this.state.username, "abc123", 4, 12);
		if (!! validation) { correct = false };
		this.setState({ err_username: validation });
		
		validation = validate(this.state.password, "abc123!", 4, null);
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
			
			
			
			// Mal
			if (res.error) {
				
				if (res.errorCode === "user_login_1") {
					this.setState({ message: "Usuario o contraseña incorrectos." });
				};
				
			};
			
			
			// Mando info a redux
			login(data);
			
			
			// Si soy empleado, pido mis ofertas para que vayan al caché
			if (! data.is_company) {
				cache("appliedOffers", {uid: data.uid}, "fresh")
				
			};
			
			
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
				<form className="br bs mt5">
					
					<div className="boxImg">
						<ImageLabor
							className="img"
							src="https://trello-attachments.s3.amazonaws.com/5e1f2e19295ba37cfa41ebe6/1000x1000/93d5c1c8cceb6c32b1d9b50a01380268/labor_logo5.png"
							w={10}
							alt="logo"
							measure="em"
						/>

					</div>
					
					<div className="titulo mb2">
						
						{/* <h2> Acceso </h2> */}
						
					</div>
					
					
					{ this.c_input("Nombre de usuario", "text", "username") }
					{ this.c_input("Contraseña", "password", "password") }
					
					
					<Button className="mt3" variant="contained" color="primary"
						onClick={ () => this.send() }
					>
						Acceder
					</Button>
					
					
					<p
						className="mt5 notienescuenta"
						onClick={ () => this.props.history.push("/register") }
					>
						¿No tienes cuenta? ¡Regístrate!
					</p>
					
					
					
					<p className="error">{this.state.message}</p>					
					
					
				</form>
			</div>
			
		);
	
	};
}
