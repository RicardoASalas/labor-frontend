
import React, { Fragment } from "react";

import "./offerRegister.scss";
import InputChips from "../../components/inputChips/inputChips";
import TextField from "@material-ui/core/TextField";
import { Button } from '@material-ui/core';
import { validate } from "../../utils/uti"
import DropdownLabor from "../../components/dropdown/dropdown";
import DropdownProvinceList from "../../components/dropdownProvinces/dropdownProvinces";
import TextInputLabor from "../../components/textInput/textInput";
import axios from "axios";
import { getUrl, /*session*/ } from "../../utils/uti";
import { connect } from "react-redux";
import { Workday } from "../../utils/const";



class OfferRegister extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			
			step: 1,
			
			
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
	
	
	async getSkillsList(){

        //Hace una peticion a la api del back que obtiene como resultado un array de skills disponibles
        let res
            
        try {
           
            
            if(!this.state.isCompany){

               
                res = await axios.get(getUrl('/skill'));

            }   
           
        } catch (err) {
            console.error(err);
        }      
        
        if(!this.state.isCompany){

        
            this.setState({skillList: res.data })

        }
        
	}
	
	validateStep = () => {
		
		let validation;
		let correct = true;
		
		
		switch (this.state.step) {
			
			case 1:
				
				validation = validate(this.state.title, "abc_", 4, 32);
				if (validation !== "") { correct = false };
				this.setState({ err_title: validation });
				
				validation = validate(this.state.sector, "abc_", 4, 32);
				if (validation !== "") { correct = false };
				this.setState({ err_sector: validation });
				
				validation = validate(this.state.description, "abc123!_", 4, 256, "gim");
				if (validation !== "") { correct = false };
				this.setState({ err_description: validation });	
				
			break;
			
			
			case 2:
				
				if (! this.state.experience) {
					this.setState({ err_experience: "No puede estar vacío."});
				} else {
					this.setState({ err_experience: "" });
				};
				
				if (! this.state.workDay) {
					this.setState({ err_workDay: "No puede estar vacío."});
				} else {
					this.setState({ err_workDay: "" });
				};
				
				
				validation = validate(this.state.minSalary, "123", 1);
				if (validation !== "") { correct = false };
				this.setState({ err_minSalary: validation });
				
				validation = validate(this.state.maxSalary, "123");
				if (validation !== "") { correct = false };
				this.setState({ err_maxSalary: validation });
				
				validation = validate(this.state.vacancy, "123", 1);
				if (validation !== "") { correct = false };
				this.setState({ err_vacancy: validation });
				
				
				if (! this.state.province) {
					this.setState({ err_province: "No puede estar vacío."});
				} else {
					this.setState({ err_province: "" });
				};
				
				validation = validate(this.state.city, "city", 1);
				if (validation !== "") { correct = false };
				this.setState({ err_city: validation });
				
				
			break;
			
			
			default: break;
			
		};
		
		
		return correct;
		
	};
	
	
	
	send = async() => {

		
		let registerData = {
			title: this.state.title,
			sector: this.state.sector,
			description: this.state.description,
			
			province: this.state.province,
			city: this.state.city,
			experience: this.state.experience,
			contract_type: this.state.contractType,
			
			workday: this.state.workDay,
			min_salary: this.state.minSalary,
			max_salary: this.state.maxSalary,
			vacants: this.state.vacancy,
			
		};
		
			
		
		
		if (this.validateStep()) {
			// Si no soy empresa, no le dejo
			
			if (!this.props.session.is_company) {
				this.props.history.push("/");
			};
			
			
			let uid = this.props.session.uid;
			let offerUid
		
			try {
				
				offerUid = await axios.post( getUrl(`/offer/register/${uid}`), registerData);

				// si se ha creado el estado selecteSkills es que se han hecho cambios y por lo tanto se
				//dispara la peticion
				if(this.state?.selectedSkills){
					console.log(this.state.selectedSkills)
					let skillsArray = [];
					let selectedSkills = this.state.selectedSkills
					let body={};
					
					// preparamos el array de skillsId
					selectedSkills.forEach(element => {
						skillsArray.push(element.id)
					});
						
					body={skill: skillsArray}
					console.log(body)
					console.log(offerUid[0].data.uid)
					//hacemos la peticion mandando por url el array de skills y el uid
					await axios.post(getUrl(`/skill/apply/${offerUid.data.uid}`), body);
					
				}
						
				} catch (err) {
					
					console.log( err );
				};

			

			// Redirección
			this.props.history.push("/profile");
		}
		
	};

	componentDidMount(){

		this.getSkillsList();

	}
	
	
	
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
					
					<TextInputLabor
						className="mt3"
						label="Sector"
						type="text"
						onChange={ (ev) => this.setState({ sector: ev.target.value }) }
						value={this.state.sector}
						helperText={this.state.err_sector}
						isError={!! this.state?.err_sector}
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
						defaultValue={["", "Selecciona una experiencia"]}
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
					
					<p className="error">{this.state.err_experience}</p>
					
					
					
					<DropdownLabor
						className={"br mt3 mb2"}
						label={"Tipo de jornada"}
						defaultValue={["", "Selecciona una jornada"]}
						elements={Workday}
						onChange={ (ev) => {this.setState({ workDay: ev.target.value })} }
					/>
					
					<p className="error">{this.state.err_workDay}</p>

					<DropdownLabor
						className={"br mt3 mb2"}
						label={"Tipo de contrato"}
						defaultValue={["", "Selecciona un tipo de contrato"]}
						elements={[
							["0","Indefinido"],
							["1","Temporal"],
							["2","Formación"],
							["3","Fin de obra"],
							]}
						onChange={ (ev) => {this.setState({ contractType: ev.target.value })} }
					/>
					
					<p className="error">{this.state.err_workDay}</p>
					
					<div className="flex-dir-c mt5">
						
						<p className="label mb2">Salario anual (€ brutos / año)</p>
						
						<div className="flex-dir-r">
							<TextInputLabor
								className=""
								label="Mínimo"
								type="number"
								onChange={ (ev) => {this.setState({ minSalary: Math.abs (ev.target.value) })} }
								value={ this.state.minSalaryStr }
								helperText={this.state.err_minSalary}
								isError={!! this.state?.err_minSalary}
							/>
							
							<TextInputLabor
								className="ml3"
								label="Máximo"
								type="number"
								onChange={ (ev) => this.setState({ maxSalary: Math.abs (ev.target.value) }) }
								value={ this.state.err_maxSalary }
								helperText={this.state.err_maxSalary}
								isError={!! this.state?.err_maxSalary}
							/>
						</div>
						
					</div>
					
					
					
					<TextInputLabor
						className="mt3"
						label="Número de vacantes"
						type="number"
						onChange={ (ev) => this.setState({ vacancy: Math.abs (ev.target.value) }) }
						value={this.state.vacancy}
						helperText={this.state.err_vacancy}
						isError={!! this.state?.err_vacancy}
					/>
					
					
					
					<div className="flex-dir-c mt5">
						
						<DropdownProvinceList
							className="mr3 mb2"
							label="Provincia"
							defaultOption="Selecciona una provincia"
							onChange={ (ev) => {
								this.setState({province : ev.target.value});
							}}
						/>
						<p className="error">{this.state.err_province}</p>
						
						<TextInputLabor
							className="mt3"
							label="Ciudad"
							type="text"
							onChange={ (ev) => this.setState({ city: ev.target.value }) }
							value={this.state.city}
							helperText={this.state.err_city}
							isError={!! this.state?.err_city}
						/>						
						
					</div>
					
					
					
					<div className="boxButtons">
						
						<Button className="btn mt3" variant="contained" color="primary"
							onClick={ () => this.setStep(1, true) }
						>
							« Anterior
						</Button>
						
						<Button className="btn mt3" variant="contained" color="primary"
							onClick={ () => this.setStep(3, true) }
						>
							Siguiente
						</Button>
						
					</div>
					
					
					
				</Fragment>
			);

			case 3: return(

				<Fragment>
					<div className="inputChips">
					<InputChips
                                // defaultValue={this.state.userSkills}
                                optionsLabelKey="name"
                                
                                label="Habilidades"
                                placeholder="Escribe una habilidad"
                                onChange={ (ev, value) => this.setState({ selectedSkills: value }) }
                                options={this.state?.skillList}
                                />
					</div>
					<div className="boxButtons">
							
						<Button className="btn mt3" variant="contained" color="primary"
							onClick={ () => this.setStep(2, true) }
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
				
			)	
			
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
	
};



const mapStateToProps = (state) => { // ese state es de redux
	return ({
		session: state.session
	})
}
export default connect(mapStateToProps) (OfferRegister);