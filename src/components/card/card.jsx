
import React from "react";


import ImageLabor from "../image/image";


/*
	<CardLabor
		title="Valencia"
		description="Trabaja en valencia"
		image="https://i.gyazo.com/c781c825fe2f8859c14b709d73a75644.png"
	/>
*/



class CardLabor extends React.Component {
	
	constructor (props) {
		super(props);
		
	};
	
	
	
	render() {
		
		return(
			
			<div className="cardLaborMain">
				
				<ImageLabor
					className="br"
					src={this.props.src}
					w={this.props.w}
					h={this.props.h}
					measure="px"
					alt={this.props.alt}
					br={2}
				/>
				
				<h2 className="">
					{this.props.title}
				</h2>
				
				<p>
					{this.props.description}
				</p>
				
				
			</div>
			
		);
	};
	
	
};


export default CardLabor;