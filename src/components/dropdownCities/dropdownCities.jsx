import React from "react";
import DropdownLabor from "../../components/dropdown/dropdown";
import CityList from "../../assets/cities.json";


export default class CityListDropDown extends React.Component {

    constructor () {
        super();
        
        this.state = {
              cityListArray:[]
        };
    }

    async componentDidMount(){
            let cityListCache = CityList;
            let cityArray = [];
            cityArray = await cityListCache.map(element => {
                
           
                console.log(element)
                // element.id=element.nm;
                // cityArray.push(Object.values(element));
                // Object.values(element)
        
            });
            
        this.setState({
            cityListArray: cityArray
        });
    }

    // // componentWillMount(){

    // //     let cityArray = [];
    // //         CityList.map(element => {
    // //             console.log(element)
    // //             // element.id=element.nm;
    // //             // cityArray.push(Object.values(element));
        
    // //         });
            
    //     this.setState({
    //         cityListArray: cityArray
    //     });
    // }
    
    
	render() {
		return (
			
			<div className={"br mt3 mr3"}>
				
				<DropdownLabor
                defaultValue={"Selecciona un municipio:"}
                elements={this.state.cityListArray}
                onChange={ this.props.onChange }
            />
			</div>
		);
	};
	
	
};

