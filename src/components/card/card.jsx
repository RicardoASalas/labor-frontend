
import React from "react";

import "./card.scss";

import ImageLabor from "../image/image";


/*
	<CardLabor
		className="mb5"
		title="Valencia"
		// description="Trabaja en Valencia"
		
		src="https://i.gyazo.com/08fddcf641ca31112e7cffa4d4532de5.png"
		w={400}
		h={200}
	/>
*/



class CardLabor extends React.Component {
	
	constructor (props) {
		super(props);
		
		
		this.state = {
			
		};
		
	};
	
	
	
	render() {
		
		return(
			
			<div className={`cardLaborMain ${this.props.className}`}>
				
				<div className="papel br">
					
					<ImageLabor
						className=""
						src={this.props.src}
						w={this.props.w}
						h={this.props.h}
						measure="px"
						alt={this.props.alt}
						br={0}
					/>
					
					<div className="pt3 pb3 pl3 pr3">
						
						<h2 className="pb1">
							{this.props.title}
						</h2>
						
						<p className="">
							{this.props.description}
						</p>
						
					</div>
					
					
				</div>
				
			</div>
			
		);
	};
	
	
};


export default CardLabor;