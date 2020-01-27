import React from "react";
// import DropdownLabor from "../dropdown/dropdown";
import ProvinceList from "../../assets/provinces.json";



export default class ProvinceListDropDown extends React.Component {
	
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	};
	
	render() {
		
		return (
			
			<div className={ "dropdownLabor " + (this.props.className ? this.props.className : "") }>
				
				<p className="label">{this.props.label}</p>
				
				<select
					value={this.props.value}
					onChange={this.props.onChange}>
					
					{
						this.props.defaultValue &&
						<option value="">{this.props.defaultValue}</option>
					}
					
					
					{
						ProvinceList.map( (_x) => {
							return (
								<option
									value={_x.nm}
									key={_x.nm}
								>
									{_x.nm}
								</option>
							)
						})
					}
					
				</select>
			</div>
		);
	};
	
	
};

