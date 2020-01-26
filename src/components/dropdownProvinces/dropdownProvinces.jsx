import React from "react";
import DropdownLabor from "../dropdown/dropdown";
import ProvinceList from "../../assets/provinces.json";


export default class ProvinceListDropDown extends React.Component {

    constructor () {
        super();
        
        this.state = {
              provinceListArray:[]
        };
    }

    componentDidMount(){
        let provinceArray = [];
    
        ProvinceList.map(element => {
            element.id=element.nm;
            provinceArray.push(Object.values(element));
    
        });
    
        
        this.setState({
            provinceListArray: provinceArray
        });
    
    };
    
	render() {
		return (
			
			<div className={"br mt3 mr3"}>
				
				<DropdownLabor
                defaultValue={"Selecciona una provincia:"}
                elements={this.state.provinceListArray}
                onChange={ this.props.onChange }
            />
			</div>
		);
	};
	
	
};

