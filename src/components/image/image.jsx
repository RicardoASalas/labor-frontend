
import React, {  } from "react";


/*
	<Image_labor
		src="https://trello-attachments.s3.amazonaws.com/5e1f2e19295ba37cfa41ebe6/1000x1000/8f347b573dc849fc8e5d6771afad8307/labor.png"
		w=100
		h=200
		alt="hola"
		measure="px"
	/>

*/


export default class ImageLabor extends React.Component {
	
	render() {
		
		const measure = this.props.measure ? this.props.measure : "px"
		const w = `${this.props.w}${measure}`;
		const h = this.props.h ? `${this.props.h}${measure}` : w;
		
		const style = {
			width: w,
			height: h,
		};
		
		
		
		return(
			<img
				className={this.props?.className}
				src={this.props.src}
				alt={this.props.alt}
				style={style}
			/>
		);
	};
	
};
