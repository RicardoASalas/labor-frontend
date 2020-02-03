
import React, {  } from "react";


/*
	<ImageLabor
		className="br"
		src="https://cdn.vox-cdn.com/thumbor/0n6dqQfk9MuOBSiM39Pog2Bw39Y=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19341372/microsoftedgenewlogo.jpg"
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
			borderRadius: br,
			objectFit: "cover"
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
