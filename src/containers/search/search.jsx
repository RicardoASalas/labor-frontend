
import React from "react";

import "./search.scss";

import { FormControl, Radio, TextField, FormControlLabel } from '@material-ui/core';
import TextInput from "../../components/textInput/textInput";
import ImageLabor from "../../components/image/image";

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
					head
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
						
						<div className="resultCard pt3 flex-dir-r">
							
							<div className="col1 flex-dir-c">
								
								<div className="image">
									<ImageLabor
										className="br"
										src="https://about.canva.com/wp-content/uploads/sites/3/2016/08/logos-1.png"
										w={100}
										alt="imagen de la empresa"
										measure="px"
										// border radius
									/>
								</div>
							</div>
							
							<div className="col2 flex-dir-c">
								<h2 className="title">Full stack developer (MERN stack)</h2>
								<h2 className="companyName">TechnoCode3000 Inc.</h2>
								
								<div className="row1 flex-dir-r">
									<p>Province | </p>
									<p>| Date</p>
								</div>
								
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint repellat aut dolore voluptatibus magni impedit animi? Assumenda sit nesciunt et, modi, delectus facilis unde dicta quidem incidunt nam accusantium odio?
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ullam, ut natus, vel facere animi perferendis sapiente quaerat earum voluptatum, minima optio fugit! Fugit, repudiandae quo nobis quidem porro dolores?
								</p>
								
								<div className="row2 flex-dir-r">
									<p>Contract type |</p>
									<p>Hours / week |</p>
									<p>Salary</p>
								</div>
								
							</div>
							
						</div>
						
					</div>
					
				</div>
				
				
				
			</div>
			
		);
	};
	
	
};


