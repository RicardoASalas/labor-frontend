
import React, { Component } from 'react';
import './home.scss';

import { connect } from "react-redux";
import CardLabor from "../../components/card/card";


class Home extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			detail: {},
			categoriaSugerida : ""
		}
		
	}


	
	render() {
		return (
			
			<div className="home">
				<div className="mainHome flex-dir-r">
					
					
					<CardLabor
						title="Valencia"
						description="Trabaja en Valencia"
						
						src="https://i.gyazo.com/08fddcf641ca31112e7cffa4d4532de5.png"
						w={400}
						h={200}
					/>
					
					<CardLabor
						title="Madrid"
						description="Trabaja en Madrid"
						
						src="https://i.gyazo.com/08fddcf641ca31112e7cffa4d4532de5.png"
						w={400}
						h={200}
					/>
					
					
				</div>
			</div>
			
		);
	}

}



const mapStateToProps = (state) => { // ese state es de redux
	return ({
		session: state.session
	})
}
export default connect(mapStateToProps) (Home);


// export default Home;