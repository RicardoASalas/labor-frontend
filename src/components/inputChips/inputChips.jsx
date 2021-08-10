
import React from 'react';

import "./inputChips.scss";

// import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


/*
	
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
	
*/



export default class InputChips extends React.Component {
	
	render() {
		
		return (
			<div className="inputChips">
				
				<Autocomplete
					multiple
					// id="tags-standard"
					// options={this.state.skills}
					options={this.props.options}
					getOptionLabel={option => option[this.props.optionsLabelKey]}
					defaultValue={this.props.defaultValue}
					
					// onChange={(event, value) => {this.setState({ selectedSkills: value })} }
					onChange={ this.props.onChange }
					
					renderInput={ (params)=> (						
						<TextField
							{...params}
							variant="standard"
							label={this.props.label}
							placeholder={this.props.placeholder}
							fullWidth
						/>
					)}
					
					
				/>
				
			</div>
		);
	};
	
	
};


