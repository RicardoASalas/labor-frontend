
import React, { Fragment } from "react";

import "./register.scss";

import TextField from "@material-ui/core/TextField";
import { FormControl, Button } from '@material-ui/core';
import { validate } from "../../utils/uti"



export default class Register extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			
			step: 2,
			
			
		};
		
	};
	
	
	
	inputToStatus = (ev, stateKey) => {
		this.setState({ [stateKey]: ev.target.value });
	};
	
	
	
	setStep = (futureStep, isBack = false) => {
		
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
				
				// caso undefined
				// caso ""
				// caso "error asd"
				
				validation = validate(this.state.username, "abc", 4, false, 12);
				if (!! validation) { correct = false };
				this.setState({ err_username: validation });
				
				validation = validate(this.state.email, "email", 1, false, 24);
				if (!! validation) { correct = false };
				this.setState({ err_email: validation });
				
				validation = validate(this.state.password, "password", 4);
				if (!! validation) { correct = false };
				this.setState({ err_password: validation });
				
				validation = validate(this.state.password2, "password", 4);
				if (!! validation) { correct = false };
				this.setState({ err_password2: validation });
				
				if (this.state?.password !== this.state?.password2) {
					this.setState({ err_password2: "Las contraseñas deben coincidir." });
					correct = false;
				};
				
				
			break;
			
			
			case 2:
				
				console.log( /[\d()+-\s]*$/g.test("1234") );
				
				validation = validate(this.state.phone, "phone");
				if (!! validation) { correct = false };
				this.setState({ err_phone: validation });
				
				validation = validate(this.state.country, "abc");
				if (!! validation) { correct = false };
				this.setState({ err_country: validation });
				
				validation = validate(this.state.province, "abc");
				if (!! validation) { correct = false };
				this.setState({ err_province: validation });
				
			break;
			
			
			default: break;
			
		};
		
		
		return correct;
		
	};
	
	
	
	send = () => {
		
		if (this.validateStep()) {
			console.log( "AXIOOOS" );
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
	
	
	
	showForm() {
		
		switch (this.state.step) {
			
			case 1: return (
				<Fragment>
					
					{ this.c_input("Nombre de usuario", "text", "username") }
					{ this.c_input("Email", "email", "email") }
					{ this.c_input("Contraseña", "password", "password") }
					{ this.c_input("Repite contraseña", "password", "password2") }
					
					<Button className="mt3" variant="contained" color="primary"
						onClick={ () => this.setStep(2) }
					>
						Siguiente
					</Button>
				</Fragment>
			);
			
			
			
			case 2: return (
				<Fragment>
					
					{ this.c_input("Teléfono", "text", "phone") }
					{ this.c_input("País", "text", "country") }
					{ this.c_input("Provincia", "text", "province") }
					
					
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
					
					
					
				</Fragment>
			);
			
			
			
			default: return "asd";
			
		};		
		
	};
	
	
	render() {
		
		return (
			<div className="registerMain">
				<form className="br mt3">
					
					<div className="titulo">
						<h2> Registro </h2>
					</div>
					
					{this.showForm()}
					
				</form>
			</div>
		);
	
	};
}
