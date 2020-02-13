
import React from "react";

import "./search.scss";

import { /*FormControl,*/ Radio, /*TextField,*/ FormControlLabel } from '@material-ui/core';
import TextInput from "../../components/textInput/textInput";
// import ImageLabor from "../../components/image/image";
import SearchResultLabor from "../../components/searchResult/searchResult";
// import InputChips from "../../components/inputChips/inputChips";
import DropdownProvinceList from "../../components/dropdownProvinces/dropdownProvinces";
import axios from "axios";
import { getUrl } from "../../utils/uti";
import store from "../../redux/store";
import ImageLabor from "../../components/image/image";
import {connect} from "react-redux";



class Search extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			
			loading: false,
			
			offerList: [],
			
			keyword: "",
			sort: "new", // new, old, pop, npop
			
			
		}
		
		
	};
	
	
	
	shouldComponentUpdate(nextProps, nextState) {
		
		if (this.state.keyword !== nextState.keyword) {
			this.debounce();
		} else if (
			this.state.province !== nextState.province ||
			this.state.filter !== nextState.filter			
		) {
			this.search();
		};
		
		
		return true;
		
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
	
	
	
	handleKeyword (keyword) {
		
		this.setState({ keyword: keyword });
		
	};
	
	
	
	debounce() {
		
		// Si ya estoy en un timeout, salgo y cancelo
        if (this.state?.debounce_timeout) {
            clearTimeout(this.state.debounce_timeout); // quito el loop
            this.setState({ debounce_timeout: null }); // y su referencia
		};
		
		
        // Empiezo un timeout
        const loop = setTimeout(() => {
			this.search();
		}, 500);
		
		
        // Guardo la referencia de timeout
		this.setState({ debounce_timeout: loop });
		
    };	
	
	
	
	async search () {
		
		try {
			
			let keyword = this.state.keyword;
			let province = this.state.province;
			let sort = this.state.sort;
			
			
			// Construyo el body
			let body = {};
			
			if (keyword) {body.keyword = keyword}
			if (province) {body.province = province}
			if (sort) {body.sort = sort}
			
			
			// Envío
			this.setState({ loading: true });
			let res = await axios.post( getUrl(`/offer/find`), body);
			
			
			// Recibo
			this.setState({ offerList: res.data });
			this.setState({ loading: false });
			
			
		} catch (err) {
			
			console.log( err );
			
		};
		
	};
	
	
	
	pulsaOferta = (_x) => {
		
		// Guardo en redux la info de la oferta sobre la que he pulsado
		store.dispatch({
			type: 'OFFER_DETAIL',
			payload: _x
		});
		
		
		// Redirijo a la vista detalle
		this.props.history.push(`/offer/detail/${_x.uid}`)
		
	};
	
	
	
	async componentDidMount () {
		
		// ¿Tengo que poner una provincia?
		if (this.props?.searchPreFilters?.province) {
			
			// La pongo
			this.setState({ province: this.props.searchPreFilters.province }, () => {
				
				// Elimino el filtro que acabo de usar
				store.dispatch({
					type: 'SEARCH_PREFILTERS_DELETE',
					payload: "province"
				});
				
			});
			
		};
		
		
		try {
			
			this.setState({ loading: true });
			
			// Llamo
			let res = await axios.post( getUrl(`/offer/find`), {
				keyword: ""
			});
			
			
			// Pongo el resultado como estado
			this.setState({ offerList: res.data });
			this.setState({ loading: false });
			
			
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
								onChange={ (ev) => this.handleKeyword(ev.target.value) }
								value={this.state.keyword}
								// helperText="Esto es un error"
								// isError={true}
							/>
							
						</div>
						
						
						
						<DropdownProvinceList
							className="mb5"
							label="Provincia"
							defaultOption={ this.props?.searchPreFilters?.province ? this.props.searchPreFilters.province : "Todas"}
							enableDefaultOption={true}
							onChange={ (ev) => {
								this.setState({province : ev.target.value});
							}}
						/>
						
						
						
						<div className="order mb5">
							
							Ordenar ofertas por:
							
							{ this.c_radio("Más recientes", "new") }
							{ this.c_radio("Más antiguos", "old") }
							{ this.c_radio("Más populares", "pop") }
							{ this.c_radio("Menos populares", "unpop") }
							
						</div>
						
						
						
						
					</div>
					
					
					
					<div className="results br">
						
						{ this.state.loading ? 
							
							<ImageLabor
								src="/img/searching.gif"
								w={10}
								measure="em"
							/>
							
							:
							
							this.state?.offerList.map( (_x) => {
								
								return <SearchResultLabor
									key={_x.id}
									
									img={_x._companyAvatar ? _x._companyAvatar : "/img/companyLogoPlaceholder.png"}
									title={_x.title}
									companyName={_x._companyName}
									description={_x.description}
									province={_x.province}
									city={_x.city}
									date={_x.created_at}
									contractType={_x.contractType}
									minSalary={_x.min_salary}
									maxSalary={_x.max_salary}
									
									onClick={ this.pulsaOferta.bind(this, _x) }
								/>
								
							})
							
						}
						
						
						
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




const mapStateToProps = (state) => {
	return ({
		searchPreFilters: state.searchPreFilters,
		
	})
};

	
export default connect(mapStateToProps) (Search);