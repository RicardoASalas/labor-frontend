
import React, { /*Fragment*/ } from "react";

import "./textInput.scss";


import { FormControl, TextField } from '@material-ui/core';



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
			
			<TextInput
				className="mt5"
				label="Casa"
				type="text"
				onChange={ (ev) => this.setState({ casa: ev.target.value }) }
				value={this.state.casa}
				validate={true}
			/>
			
		*/
		
		
		// let helperText = this.props?.helperText;
		
		
		
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
