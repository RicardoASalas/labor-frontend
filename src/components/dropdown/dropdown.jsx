

import React from "react";

import "./dropdown.scss";



/*
	
	<DropdownLabor
		className={"br"}
		label={"Test"}
		defaultValue={"Selecciona una opción"}
		elements={[
			["1", "Uno"],
			["2", "Dos"]
		]}
		onChange={ (ev) => {this.setState({ test: "test" }) } }
	/>
	
*/



export default class DropdownLabor extends React.Component {
	
	// constructor (props) {
	// 	super(props);
		
	// };
	
	render() {
		return (
			
			<div className={ "dropdownLabor " + (this.props.className ? this.props.className : "") }>
				
				<p className="label">{this.props.label}</p>
				
				<select
					value={this.props.value}
					onChange={this.props.onChange}
					defaultValue=""
				>
					
					{
						this.props.defaultValue &&
						<option
							value=""
							disabled={true}
						>
							{this.props.defaultValue}
						</option>
					}
					
					
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
				
				
				<p className="error mt2"> {this.props.helperText} </p>
				
			</div>
		);
	};
	
	
};
