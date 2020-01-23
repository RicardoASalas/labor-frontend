
import React, { Fragment } from "react";

import "./registerOffer.scss";

import TextField from "@material-ui/core/TextField";
import { FormControl, Button, Radio, RadioGroup, FormControlLabel, TextareaAutosize } from '@material-ui/core';
import { validate, numToStr } from "../../utils/uti"
import DropdownLabor from "../../components/dropdown/dropdown";
import TextInputLabor from "../../components/textInput/textInput";

export default class RegisterOffer extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			
			step: 2,
			
			
			userTypeSelectionPending: true,
			
		};
		
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
				
				validation = validate(this.state.title, "a b c", 4, 32);
				if (validation !== "") { correct = false };
				this.setState({ err_title: validation });
				
				validation = validate(this.state.description, "abc123!", 4, 256);
				if (validation !== "") { correct = false };
				this.setState({ err_description: validation });	
				
			break;
			
			
			case 2:
				
				validation = validate(this.state.phone, "phone", 1);
				if (validation !== "") { correct = false };
				this.setState({ err_phone: validation });
				
				validation = validate(this.state.country, "abc", 1);
				if (validation !== "") { correct = false };
				this.setState({ err_country: validation });
				
				validation = validate(this.state.province, "abc", 1);
				if (validation !== "") { correct = false };
				this.setState({ err_province: validation });
				
				if (this.state.userTypeSelectionPending) { correct = false };
				this.setState({ err_isEnterprise: "Debes elegir si eres trabajador o empresa." });				
				
				
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
					
					<TextInputLabor
						className="mt3"
						label="Título"
						type="text"
						onChange={ (ev) => this.setState({ title: ev.target.value }) }
						value={this.state.title}
						helperText={this.state.err_title}
						isError={!! this.state?.err_title}
					/>
					
					<TextField
						className="mt3"
						variant="outlined"
						multiline
						label="Descripción"
						rows="16"
						// defaultValue=""
						onChange={ (ev) => this.setState({ description: ev.target.value }) }
						value={this.state.description}
						helperText={this.state.err_description}
						error={!! this.state?.err_description}
					/>					
					
					<Button className="mt3" variant="contained" color="primary"
						onClick={ () => this.setStep(2) }
					>
						Siguiente
					</Button>
					
				</Fragment>
			);
			
			
			
			case 2: return (
				<Fragment>
					
					<DropdownLabor
						className={"br mt4 mb2"}
						label={"Experiencia mínima requerida"}
						elements={[
							["0", "Sin experiencia"],
							["1", "1 año"],
							["2", "2 años"],
							["3", "3 años"],
							["4", "4 años"],
							["5", "5 años"],
							["6", "6 años"],
							["7", "7 años"],
							["8", "8+ años"]
						]}
						onChange={ (ev) => {this.setState({ experience: ev.target.value }) } }
					/>
					
					
					
					<DropdownLabor
						className={"br mt3"}
						label={"Tipo de jornada"}
						elements={[
							["mj", "Media jornada"],
							["jc", "Jornada completa"],
							["jim", "Jornada intensiva mañana"],
							["jit", "Jornada intensiva tarde"],
							["jin", "Jornada intensiva noche"],
							["tt", "Teletrabajo"]
						]}
						onChange={ (ev) => {this.setState({ workDay: ev.target.value })} }
					/>
					
					
					
					<div className="flex-dir-c mt3">
						
						<p className="label">Salario anual (€ brutos / año)</p>
						
						<div className="flex-dir-r">
							<TextInputLabor
								className=""
								label="Mínimo"
								type="number"
								onChange={ (ev) => this.setState({ minSalary: ev.target.value }) }
								value={this.state.minSalary}
								helperText={this.state.err_minSalary}
								isError={!! this.state?.err_minSalary}
							/>
							
							<TextInputLabor
								className="ml3"
								label="Máximo"
								type="number"
								onChange={ (ev) => this.setState({ maxSalary: ev.target.value }) }
								value={ this.state.maxSalary }
								helperText={this.state.err_maxSalary}
								isError={!! this.state?.err_maxSalary}
							/>
						</div>
						
						
					</div>
					
					
					
					<TextInputLabor
						className="mt3"
						label="Número de vacantes"
						type="number"
						onChange={ (ev) => this.setState({ vacancy: ev.target.value }) }
						value={this.state.vacancy}
						helperText={this.state.err_vacancy}
						isError={!! this.state?.err_vacancy}
					/>
					
					
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
				<form className="br bs mt3">
					
					<div className="titulo">
						<h2> Crear nueva oferta </h2>
					</div>
					
					
					{this.showForm()}
					
				</form>
			</div>
		);
	
	};
}
