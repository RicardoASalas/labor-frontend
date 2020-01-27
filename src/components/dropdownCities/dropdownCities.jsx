
import React from 'react';
import DropdownLabor from "../dropdown/dropdown";
import CityList from "../../assets/cities.json";



export default class CityListDropDown extends React.Component {

    constructor () {
        super();
        
        this.state = {
              CityListArray:[]
        };
    }

    componentDidMount(){
        let CityArray = [];
        console.log(CityList)
        CityList.map(element => {
            element.id=element.nm;
            CityArray.push(Object.values(element));
    
        });
    
        
        this.setState({
            CityListArray: CityArray
        });
    
    };
    
	render() {
		return (
        
			<div className={"br mt3 mr3"}>
				
				<DropdownLabor
                defaultValue={"Selecciona un municipio:"}
                elements={this.state.CityListArray}
                onChange={ this.props.onChange }
            />
            
			</div>
       
		);
	};
	
	
};

