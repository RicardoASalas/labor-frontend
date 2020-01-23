

import React from "react";

import "./dropdown.scss";



/*
	
	<DropdownLabor
		className={"br"}
		defaultValue={"Selecciona una opción"}
		elements={[
			["1", "Uno"],
			["2", "Dos"]
		]}
		onChange={ (ev) => {console.log( ev.target.value );} }
	/>
	
*/



export default class DropdownLabor extends React.Component {
	
	// constructor (props) {
	// 	super(props);
		
	// };
	
	render() {
		return (
			<div className="dropdownLabor">
				<select
					className={this.props.className}
					value={this.props.value}
					onChange={this.props.onChange}>
					
					<option value="">{this.props.defaultValue}</option>
					
					{
						this.props.elements.map( (_x) => {
							return (
								<option
									value={_x[0]}
									key={_x[0]}
								>
									{_x[1]}
								</option>
							)
						})
					}
					
				</select>
			</div>
		);
	};
	
	
};
