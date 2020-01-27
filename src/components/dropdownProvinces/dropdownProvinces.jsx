import React from "react";
// import DropdownLabor from "../dropdown/dropdown";



export default class ProvinceListDropDown extends React.Component {
	
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	};
	
	
	constructor (props) {
		
		super(props);
		
		this.state = {
			provinces: [
				'Albacete',       'Alicante/Alacant',       'Almería',
				'Araba/Álava',    'Asturias',               'Badajoz',
				'Balears, Illes', 'Barcelona',              'Bizkaia',
				'Burgos',         'Cantabria',              'Castellón/Castelló',
				'Ceuta',          'Ciudad Real',            'Coruña, A',
				'Cuenca',         'Cáceres',                'Cádiz',
				'Córdoba',        'Gipuzkoa',               'Girona',
				'Granada',        'Guadalajara',            'Huelva',
				'Huesca',         'Jaén',                   'León',
				'Lleida',         'Lugo',                   'Madrid',
				'Melilla',        'Murcia',                 'Málaga',
				'Navarra',        'Ourense',                'Palencia',
				'Palmas, Las',    'Pontevedra',             'Rioja, La',
				'Salamanca',      'Santa Cruz de Tenerife', 'Segovia',
				'Sevilla',        'Soria',                  'Tarragona',
				'Teruel',         'Toledo',                 'Valencia/València',
				'Valladolid',     'Zamora',                 'Zaragoza',
				'Ávila'			
			],
			
		}
		
	};
	
	
	
	render() {
		
		return (
			
			<div className={ "dropdownLabor " + (this.props.className ? this.props.className : "") }>
				
				<p className="label">{this.props.label}</p>
				
				<select
					value={this.props.value}
					onChange={this.props.onChange}>
					
					{
						this.props.defaultValue &&
						<option value="">{this.props.defaultValue}</option>
					}
					
					
					{
						this.state.provinces.map( (_x) => {
							return (
								<option
									value={_x}
									key={_x}
								>
									{_x}
								</option>
							)
						})
					}
					
				</select>
			</div>
		);
	};
	
	
};

