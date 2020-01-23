
import React, {  } from "react";


/*
	<ImageLabor
		className="br"
		src="https://about.canva.com/wp-content/uploads/sites/3/2016/08/logos-1.png"
		w={100}
		alt="imagen de la empresa"
		measure="px"
		br={15}
	/>
*/


export default class ImageLabor extends React.Component {
	
	render() {
		
		const measure = this.props.measure ? this.props.measure : "px"
		const w = `${this.props.w}${measure}`;
		const h = this.props.h ? `${this.props.h}${measure}` : w;
		const br = this.props.br ? `${this.props.br}%` : "0%";
		
		const style = {
			width: w,
			height: h,
			borderRadius: br
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
