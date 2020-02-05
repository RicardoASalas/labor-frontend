
import React, { Fragment } from "react";

import "./register.scss";

import TextField from "@material-ui/core/TextField";
import { FormControl, Button, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { validate } from "../../utils/uti";
import DropdownProvinceList from "../../components/dropdownProvinces/dropdownProvinces";
import axios from "axios";
import { getUrl, /*session*/ } from "../../utils/uti";


export default class Register extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			
			step: 1,
			province: "",
			city: "",
			userTypeSelectionPending: true,
			
		};
		
	};
	
	
	
	componentDidMount() {
		
		// axios.get("http://localhost:3000/api/test")
		// .then((res) => {console.log( res )})
		
		
		// axios.post("http://localhost:3000/api/test", {"key": "asdf"})
		// .then((res) => {console.log( res )})
		
		
		/*
		axios.post("https://localhost:3000/api/user/register", {
			"username": "Ricardooo",
			"email": "ricardo@labor.com",
			"password": "1234",
			"province": "Valencia",
			"city": "Valencia",
			"is_company": false,
			"name": "Ricardo",
			"surname": "Salas",
			"nif": "25774146S",
			"phone": "647009123",
			"website": "www.asd.es",
			"description": "test"
		}).then((res) => {console.log( res )})
		.catch( (err) => {console.log( err )} )
		*/
		
	}
	
	
	inputToStatus = (ev, stateKey) => {
		this.setState({ [stateKey]: ev.target.value });
	};
	
	handleUserTypeSelection = (ev) => {
		this.setState({ isEnterprise: ev.target.value === "true" });
		this.setState({ userTypeSelectionPending: false });
	};
	
	
	
	setStep = (futureStep, isBack = false, asd) => {
		
		if (isBack) {
			this.setState({ step: futureStep });
			return;
		};
		
		if (this.validateStep()) {
			this.setState({ step: futureStep });
		};
		
	};
	
	
	
	validateStep = () => {
		
		let validation;
		let correct = true;
		
		
		switch (this.state.step) {
			
			case 1:
				
				validation = validate(this.state.username, "abc123", 4, 12);
				if (validation !== "") { correct = false };
				this.setState({ err_username: validation });
				
				validation = validate(this.state.email, "email", 1, 30);
				if (validation !== "") { correct = false };
				this.setState({ err_email: validation });
				
				validation = validate(this.state.password, "abc123!", 4);
				if (validation !== "") { correct = false };
				this.setState({ err_password: validation });
				
				validation = validate(this.state.password2, "abc123!", 4);
				if (validation !== "") { correct = false };
				this.setState({ err_password2: validation });
				
				if (this.state?.password !== this.state?.password2) {
					this.setState({ err_password2: "Las contraseñas deben coincidir." });
					correct = false;
				};
				
				if (this.state.province === "") {
					this.setState({ err_province: "No puede estar vacío."});
				} else {
					this.setState({ err_province: "" });
				};
				
				validation = validate(this.state.city, "city", 1);
				if (validation !== "") { correct = false };
				this.setState({ err_city: validation });
				
				if (this.state.userTypeSelectionPending) { correct = false };
				this.setState({ err_isEnterprise: "Debes elegir si eres trabajador o empresa." });
				
			break;
			
			
			case 2:
				
				validation = validate(this.state.name, "abc", 1);
				if (validation !== "") { correct = false };
				this.setState({ err_name: validation });
				
				validation = validate(this.state.phone, "phone", 9);
				if (validation !== "") { correct = false };
				this.setState({ err_phone: validation });
				
				
				if (! this.state.isEnterprise) {
					
					validation = validate(this.state.surname, "abc", 4);
					if (validation !== "") { correct = false };
					this.setState({ err_surname: validation });
					
					validation = validate(this.state.nif, "nif", 9);
					if (validation !== "") { correct = false };
					this.setState({ err_nif: validation });
					
				} else {
					
					validation = validate(this.state.cif, "cif", 9, 9);
					if (validation !== "") { correct = false };
					this.setState({ err_cif: validation });
					
					validation = validate(this.state.sector, "abc_", 2);
					if (validation !== "") { correct = false };
					this.setState({ err_sector: validation });
					
				};
				
			break;
			
			
			default: break;
			
		};
		
		
		return correct;
		
	};
	
	
	
	send = async () => {
		
		// Si no es correcta la validación, no sigo
		if (! this.validateStep()) return;
		
		
		// Axios
		try {
			
			// Genero body
			let registerData = {
				username: this.state.username,
				email: this.state.email,
				password: this.state.password,
				
				province: this.state.province,
				city: this.state.city,
				is_company: this.state.isEnterprise,
				
				name: this.state.name,
				phone: this.state.phone,
				
				description: `Descripción de ${this.state.name}.`,
				
			};
			
			
			if (this.state.isEnterprise) {
				registerData.sector = this.state.sector;
				registerData.cif = this.state.cif;
			} else {
				registerData.surname = this.state.surname;
				registerData.nif = this.state.nif;
			};
			
			
			
			// Hago la llamada
			let res = await axios.post( getUrl("/user/register"), registerData);
			let data = res.data;
			
			
			if (data.success) {
				
				// Muestro mensaje de éxito
				this.setState({ success: "Cuenta creada con éxito. Redirigiendo..." });
				
				
				// Redirección
				setTimeout( () => {
					this.props.history.push("/login");
				}, 1500);
				
			};
			
			
			
			
			
		} catch (err) {
			
			
			
			let res = err?.response?.data;
			
			
			if (!res) {
				return console.error( err );
			};
			
			
			
			if (res.errorCode === "user_register_1") {
				this.setState({ error: "El nombre de usuario o el email ya está en uso." });
			};			
			
			
			
			if (res.errorCode === "user_login_2") {
				
				// Guardo datos de sesión
				// session.set({
				// 	username: res.username,
				// 	userId: res.userId,
				// 	token: res.token,
				// 	userType: res.userType
				// });
				
				
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

	
	c_input = (label, type, stateKey, className) => {
		
		let errTxt = this.state?.[`err_${stateKey}`];
		let err = !! errTxt;
		
		
		return (
			
			<FormControl className="mt3">
				<TextField
					className={className}
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
	
	
	
	showForm() {
		
		switch (this.state.step) {
			
			case 1: return (
				<Fragment>
					
					{ this.c_input("Nombre de usuario", "text", "username") }
					{ this.c_input("Email", "email", "email") }
					{ this.c_input("Contraseña", "password", "password") }
					{ this.c_input("Repite contraseña", "password", "password2") }
					<div className="flex-dir-r">
						
						<DropdownProvinceList
							className="mt3 mr3"
							label="Provincia"
							defaultOption="Selecciona una provincia"
							onChange={ (ev) => {
								this.setState({province : ev.target.value});
							}}
							helperText={this.state.err_province}
						/>
						
						{ this.c_input("Ciudad", "text", "city", "wfc") }
						
					</div>
					<div className="flex-dir-r">
						<RadioGroup
							className="mt3"
							aria-label="Employed or enterprise"
							name="isEnterprise"
							// value={this.state.isEnterprise}
							onChange={ this.handleUserTypeSelection }
						>
						<FormControlLabel
							value={ "false" }
							control={<Radio color="primary" />}
							label="Soy empleado"
							labelPlacement="end"
						/>
						<FormControlLabel
							value={ "true" }
							control={<Radio color="primary" />}
							label="Soy empresa"
							labelPlacement="end"
						/>
						</RadioGroup>
						</div>
						
						<p className="error">
							{this.state?.err_isEnterprise}
						</p>
						
					<Button className="mt3" variant="contained" color="primary"
						onClick={ () =>{ 
							
							this.setStep(2)
						}}
					>
						Siguiente
					</Button>
				</Fragment>
			);
			
			
			
			case 2:
			
				if (! this.state.isEnterprise){
					return (
						<Fragment>

							{ this.c_input("Name", "text", "name") }
							{ this.c_input("Surname", "text", "surname") }
							{ this.c_input("Teléfono", "text", "phone") }
							{ this.c_input("NIF", "text", "nif") }
			


							<div className="boxButtons">
								
								<Button className="btn mt3" variant="contained" color="primary"
									onClick={ () => this.setStep(1, true) }
								>
									« Anterior
								</Button>
								
								<Button className="btn mt3" variant="contained" color="secondary"
									onClick={ () => this.send() }
								>
									Enviar
								</Button>
								
							</div>
							
							
							<p className={ (this.state.error === "") ? "hidden" : "error mt5" }>{this.state.error}</p>
							<p className={ (this.state.success === "") ? "hidden" : "success mt5" }>{this.state.success}</p>
							
						</Fragment>
					);
					
				} else {
					
					return (
						<Fragment>
		
							{ this.c_input("Name", "text", "name") }
							{ this.c_input("Teléfono", "text", "phone") }
							{ this.c_input("CIF", "text", "cif") }
							{ this.c_input("Sector", "text", "sector") }

							<div className="boxButtons">
								
								<Button className="btn mt3" variant="contained" color="primary"
									onClick={ () => this.setStep(1, true) }
								>
									« Anterior
								</Button>
								
								<Button className="btn mt3" variant="contained" color="secondary"
									onClick={ () => this.send() }
								>
									Enviar
								</Button>
								
							</div>
							
							
							<p className={ (this.state.message === "") ? "hidden" : "error mt5" }>{this.state.error}</p>
							
						</Fragment>
					);
				};
				
			default: return "asd";
			
		};		
		
	};
	
	
	
	render() {
		return (
			<div className="registerMain">
				<form className="br bs mt3">
					
					<div className="titulo">
						<h2> Registro </h2>
					</div>
					
					
					{this.showForm()}
					
				</form>
			</div>
		);
	
	};
}
