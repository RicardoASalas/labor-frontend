
import React from "react";

import "./search.scss";

import { FormControl, Radio, TextField, FormControlLabel } from '@material-ui/core';
import TextInput from "../../components/textInput/textInput";
// import ImageLabor from "../../components/image/image";
import SearchResultLabor from "../../components/searchResult/searchResult";
// import InputChips from "../../components/inputChips/inputChips";
import ProvinceListDropDown from "../../components/dropdownProvinces/dropdownProvinces";
import axios from "axios";
import { getUrl } from "../../utils/uti";
import store from "../../redux/store";



export default class Search extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			
			offerList: [],
			keyword: "",
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
					onChange={ this.setState({ keyword: this.target.value }) }
					value={this.state.keyword ? this.state.keyword : ""}
				/>
			</FormControl>
			
		);
		
	};
	
	
	
	async search (keyword = "") {
		
		try {
			
			let res = await axios.post( getUrl(`/offer/find`), {
				keyword: keyword
			});
			
			this.setState({ offerList: res.data });
			
			
		} catch (err) {
			
			console.log( err );
			
		};
		
	};
	
	
	
	debounce(keyword) {
		
		// Si ya estoy en un timeout, salgo y cancelo
        if (this.state?.debounce_timeout) {
            clearTimeout(this.state.debounce_timeout); // quito el loop
            this.setState({ debounce_timeout: null }); // y su referencia
		}
		
        // Empiezo un timeout
        const loop = setTimeout(() => {
			
			this.search(keyword);
			
		}, 500);
		
		
        // Guardo la referencia de timeout
		this.setState({ debounce_timeout: loop });
		
    };
	
	
	
	pulsaOferta = (_x) => {
		
		// Guardo en redux la info de la oferta sobre la que he pulsado
		store.dispatch({
			type: 'OFFER_DETAIL',
			payload: _x
		});
		
		
		// Redirijo a la vista detalle
		this.props.history.push("/offer/detail")
		
	};
	
	
	
	async componentDidMount () {
		
		try {
			
			let res = await axios.post( getUrl(`/offer/find`), {
				keyword: this.state.keyword
			});
			
			this.setState({ offerList: res.data });
			
			
		} catch (err) {
			
			console.log( err );
			
		};
		
	};
	
	
	
	render() {
		
		return(
			
			<div className="searchMain">
				
				<div className="header br">
					{`${this.state?.offerList.length} ofertas encontradas`}
				</div>
				
				
				
				<div className="body">
					
					<div className="filters br flex-dir-c">
						
						<div className="search mb5">
							
							<TextInput
								className=""
								label="Búsqueda"
								type="text"
								// onChange={ (ev) => this.setState({ keyword: ev.target.value }) }
								onChange={ (ev) => this.debounce(ev.target.value) }
								value={this.state.keyword}
								// helperText="Esto es un error"
								// isError={true}
							/>
							
						</div>
						
						
						
						<ProvinceListDropDown className="mb5" />
						
						
						
						<div className="order mb5">
							
							Ordenar ofertas por:
							
							{ this.c_radio("Más recientes", "new") }
							{ this.c_radio("Más antiguos", "old") }
							{ this.c_radio("Más populares", "pop") }
							{ this.c_radio("Menos populares", "unpop") }
							
						</div>
						
						
						
						
					</div>
					
					
					
					<div className="results br">
						
						{this.state?.offerList.map( (_x) => {
							
							return <SearchResultLabor
								key={_x.id}
								
								img={"https://about.canva.com/wp-content/uploads/sites/3/2016/08/logos-1.png"}
								title={_x.title}
								companyName={_x.company_id}
								description={_x.description}
								city={_x.city}
								date={_x.created_at}
								contractType={_x.contractType}
								minHoursWeek={20}
								maxHoursWeek={25}
								minSalary={_x.min_salary}
								maxSalary={_x.max_salary}
								
								onClick={ this.pulsaOferta.bind(this, _x) }
							/>
							
						})}
						
						
						{/* <SearchResultLabor
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
						/> */}
						
					</div>
					
				</div>
				
				
				
			</div>
			
		);
	};
	
	
};


