
import React, { Fragment } from "react";

import "./textInput.scss";


import { FormControl, TextField } from '@material-ui/core';


/*
<TextInput
	handler={ this.handleChange }
	stateKey="username"
	placeholder="Username"
/>
*/

export default class TextInput extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			
		};
		
	};
	
	
	
	render() {
		
		/*
			
			<TextInput
				className="mt5"
				label="Casa"
				type="text"
				onChange={ (ev) => this.setState({ casa: ev.target.value }) }
				value={this.state.casa}
			/>
			
			<TextInput
				className="mt5"
				label="Casa"
				type="text"
				onChange={ (ev) => this.setState({ casa: ev.target.value }) }
				value={this.state.casa}
				helperText="Esto es un error"
				isError={true}
			/>
			
		*/
		
		let errTxt = this.props?.error;
		let isError = !! errTxt;
		
		
		
		return (
			
			<FormControl>
				<TextField
					className={ this.props?.className }
					error={ this.props?.isError }
					helperText={ this.props?.helperText }
					// id="outlined-basic"
					type={this.props.type}
					label={this.props.label}
					variant="outlined"
					// onChange={ (ev) => this.inputToStatus(ev, stateKey) }
					onChange={ this.props.onChange }
					value={ this.props.value }
				/>
			</FormControl>
			
		);
		
	};
	
	
};
