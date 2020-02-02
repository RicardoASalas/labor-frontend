
import React, { Component } from 'react';
import './home.scss';

import { connect } from "react-redux";



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
			<div className="mainHome">
					
					
					
			</div>
		</div>
		)
	}

}



const mapStateToProps = (state) => { // ese state es de redux
	return ({
		session: state.session
	})
}
export default connect(mapStateToProps) (Home);


// export default Home;