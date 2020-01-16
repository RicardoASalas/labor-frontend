
import React, { Fragment } from "react";

import "./textInput.scss";


class TextInput extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			
		};
		
	};
	
	
	
	render() {
		
		return(
			<Fragment>
				<input
					className="textInput"
					
					type={this.props.type? this.props.type : "text"}
					placeholder={this.props.placeholder}
					
					onChange={ (ev) => this.props.handler(ev, this.props.stateKey) }
					
				/>
			</Fragment>
		);
	};
	
	
};


export default TextInput;
