
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
		
	};
	
	
	
	render() {
		return (
			
			<div className="home">
				<div className="mainHome flex-dir-c aic p3">
					
					<h2 className="titulo pt3 pb2 tac">Impulsa tu carrera con empresas líderes</h2>
					<div className="flex-dir-r">
						<CardLabor
							className="mr3"
							title="Microsoft"
							description="Empresa líder en su sector."
							
							src="https://i.gyazo.com/b157345a5d269641907260b7e7dd32ab.png"
							w={500}
							h={200}
						/>
						
						<CardLabor
							className="mr3"
							title="Google"
							description="Empresa líder en su sector."
							
							src="https://i.gyazo.com/342242e20c9a4c7b79992d3d8d934bed.png"
							w={500}
							h={200}
						/>
						
						<CardLabor
							className="mr3"
							title="Apple"
							description="Empresa líder en su sector."
							
							src="https://i.gyazo.com/53436607ee84ec60dbd16fd7a97e99de.jpg"
							w={500}
							h={200}
						/>
					</div>
					
					
					
					<h2 className="titulo pt5 pb2">Trabaja cerca de casa</h2>
					<div className="flex-dir-r">
						
						<CardLabor
							className="mr3"
							title="Valencia"
							// description="Trabaja en Valencia"
							
							src="https://i.gyazo.com/0935cd92e30cb2698ea8398abb2c44fb.png"
							w={300}
							h={200}
						/>
						
						<CardLabor
							className="mr3"
							title="Madrid"
							// description="Trabaja en Madrid"
							
							src="https://i.gyazo.com/c9f47212945131ee141ecca0a7e476a4.png"
							w={300}
							h={200}
						/>
						
						<CardLabor
							className="mr3"
							title="Barcelona"
							// description="Trabaja en Madrid"
							
							src="https://i.gyazo.com/0a52fe7e1d3742dd7d3efa4cc5b495ca.jpg"
							w={300}
							h={200}
						/>
						
						<CardLabor
							className=""
							title="Bilbao"
							// description="Trabaja en Madrid"
							
							src="https://i.gyazo.com/30e307ab8d68bd315b7f8268bd2749dd.png"
							w={300}
							h={200}
						/>
						
					</div>
					
					
					
					<h2 className="titulo pt5 pb2">Sectores con más oportunidades</h2>
					<div className="flex-dir-r">
						<CardLabor
							className="mr3"
							title="Programación"
							
							src="https://i.gyazo.com/68b69be089e2e5916e2fc64c2ce4aea3.png"
							w={300}
							h={200}
						/>
						
						<CardLabor
							className="mr3"
							title="Salud"
							// description="Trabaja en Madrid"
							
							src="https://i.gyazo.com/e724f071091c79aa35254a8184024ba2.png"
							w={300}
							h={200}
						/>
						
						<CardLabor
							className="mr3"
							title="Marketing"
							// description="Trabaja en Madrid"
							
							src="https://i.gyazo.com/05d1f92ab9da2c9971c08d8cca8be0e4.png"
							w={300}
							h={200}
						/>
						
						<CardLabor
							className=""
							title="Educación"
							// description="Trabaja en Madrid"
							
							src="https://i.gyazo.com/48ddb1e624ff6db98f4df0a245c45e9c.jpg"
							w={300}
							h={200}
						/>
					</div>
					
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
