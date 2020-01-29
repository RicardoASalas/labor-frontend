
import React from "react";

import "./search.scss";

import { FormControl, Radio, TextField, FormControlLabel } from '@material-ui/core';
import TextInput from "../../components/textInput/textInput";
// import ImageLabor from "../../components/image/image";
import SearchResultLabor from "../../components/searchResult/searchResult";
import InputChips from "../../components/inputChips/inputChips";



export default class Search extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			
			filter: "new", // new, old, pop, npop
			
			
		}
		
		
	};


	c_radio = (label, stateKey) => {
		
		// { this.c_radio("Más recientes", "new") }
		
		
		return (
			<FormControlLabel
				checked={ this.state.filter === stateKey }
				control={<Radio color="primary" />}
				label={label}
				labelPlacement="end"
				onChange={ () => this.setState({ filter: stateKey }) }
			/>
		);
	};
	
	
	
	c_input = (label, type, stateKey) => {
		
		// let errTxt = this.state?.[`err_${stateKey}`];
		// let err = !! errTxt;
		
		
		return (
			
			<FormControl className="mt3">
				<TextField
					// error={ err }
					// helperText={ errTxt }
					// id="outlined-basic"
					type={type}
					label={label}
					variant="outlined"
					onChange={ this.setState({ keywords: this.target.value }) }
					value={this.state.keywords ? this.state.keywords : ""}
				/>
			</FormControl>
			
		);
		
	};
	
	
	render() {
		return(
			
			<div className="searchMain">
				
				<div className="header br">
					
					<InputChips
						defaultValue={[]}
						optionsLabelKey="name"
						
						label="Habilidades"
						placeholder="Escribe una habilidad"
						
						onChange={ (ev, value) => this.setState({ selectedSkills: value }) }
						
						options={[
							{ name: "Javascript (junior)", code: "js1" },
							{ name: "Javascript (middle)", code: "js2" },
							{ name: "Javascript (senior)", code: "js3" },
							
							{ name: "PHP (junior)", code: "php1" },
							{ name: "PHP (middle)", code: "php2" },
							{ name: "PHP (senior)", code: "php3" },
							
							{ name: "Phyton (junior)", code: "py1" },
							{ name: "Phyton (middle)", code: "py2" },
							{ name: "Phyton (senior)", code: "py3" },
							
							{ name: "Java (junior)", code: "jv1" },
							{ name: "Java (middle)", code: "jv2" },
							{ name: "Java (senior)", code: "jv3" },
						]}
						
					/>
					
				</div>
				
				<div className="body">
					
					<div className="filters br flex-dir-c">
						
						<div className="order">
							
							Ordenar ofertas por:
							
							{ this.c_radio("Más recientes", "new") }
							{ this.c_radio("Más antiguos", "old") }
							{ this.c_radio("Más populares", "pop") }
							{ this.c_radio("Menos populares", "unpop") }
							
						</div>
						
						
						
						<div className="search">
							
							<TextInput
								className="mt5"
								label="Búsqueda"
								type="text"
								onChange={ (ev) => this.setState({ keywords: ev.target.value }) }
								value={this.state.keywords}
								// helperText="Esto es un error"
								// isError={true}
							/>
							
						</div>
						
					</div>
					
					
					
					<div className="results br">
						
						<SearchResultLabor
							img={"https://about.canva.com/wp-content/uploads/sites/3/2016/08/logos-1.png"}
							title="Full stack developer (MERN stack)"
							companyName="Nombre de empresa 02"
							description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint repellat aut dolore voluptatibus magni impedit animi? Assumenda sit nesciunt et, modi, delectus facilis unde dicta quidem incidunt nam accusantium odio?"
							city="Valencia"
							date="21 ene"
							contractType="Fulltime"
							minHoursWeek={20}
							maxHoursWeek={25}
							minSalary={15000}
							maxSalary={16000}
						/>
						<SearchResultLabor
							img={"https://about.canva.com/wp-content/uploads/sites/3/2016/08/logos-1.png"}
							title="Full stack developer (MERN stack)"
							companyName="Nombre de empresa 02"
							description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint repellat aut dolore voluptatibus magni impedit animi? Assumenda sit nesciunt et, modi, delectus facilis unde dicta quidem incidunt nam accusantium odio?"
							city="Valencia"
							date="21 ene"
							contractType="Fulltime"
							minHoursWeek={20}
							maxHoursWeek={25}
							minSalary={15000}
							maxSalary={16000}
						/>
						<SearchResultLabor
							img={"https://about.canva.com/wp-content/uploads/sites/3/2016/08/logos-1.png"}
							title="Full stack developer (MERN stack)"
							companyName="Nombre de empresa 02"
							description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint repellat aut dolore voluptatibus magni impedit animi? Assumenda sit nesciunt et, modi, delectus facilis unde dicta quidem incidunt nam accusantium odio?"
							city="Valencia"
							date="21 ene"
							contractType="Fulltime"
							minHoursWeek={20}
							maxHoursWeek={25}
							minSalary={15000}
							maxSalary={16000}
						/>
						
					</div>
					
				</div>
				
				
				
			</div>
			
		);
	};
	
	
};


