
import React, {  } from "react";

import "./offerDetail.scss";

import { Button } from '@material-ui/core';
import ImageLabor from "../../components/image/image";


export default class OfferDetail extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			
		};
		
	};
	
	
	
	render() {
		return(
			
			<div className="offerDetailMain">
				
				<div className="header br flex-dir-c">
					
					<div className="image mr3">
						<ImageLabor
							className="br"
							src="https://cdn.vox-cdn.com/thumbor/0n6dqQfk9MuOBSiM39Pog2Bw39Y=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19341372/microsoftedgenewlogo.jpg"
							w={100}
							alt="imagen de la empresa"
							measure="px"
							br={15}
						/>
					</div>
					
					<div className="companyInfo jcc">
						<h1>Nombre empresa</h1>
						<h2>Sector</h2>
					</div>
					
					<Button
						className="buttonApply"
						variant="contained"
						color="secondary"
						// onClick={ () => this.send() }
					>
						Acceder
					</Button>					
					
					
				</div>
				
				
				
				<div className="header br flex-dir-r">
					
					<div className="offerInfo flex-dir-r">

							
						<div className="info flex-dir-r aic">
								<div className="col1 mr1">
									<i className="material-icons">location_city</i>
								</div>
								<div className="col2">
									<p>Valencia, Valencia (España)</p>
								</div>
						</div>
						
						<div className="info flex-dir-r aic">
								<div className="col1 mr1">
									<i className="material-icons">calendar_today</i>
								</div>
								<div className="col2">
									<p> 27-01-2020</p>
								</div>
						</div>
						
						<div className="info flex-dir-r aic">
							<div className="col1 mr1">
								<i className="material-icons">euro_symbol</i>
							</div>
							<div className="col2">
								<p> 12.000 - 14.000 €</p>
							</div>
						</div>
						
						<div className="info flex-dir-r aic">
							<div className="col1 mr1">
								<i className="material-icons">emoji_events</i>
							</div>
							<div className="col2">
								<p> 1 año</p>
							</div>
						</div>
						
						<div className="info flex-dir-r aic">
							<div className="col1 mr1">
								<i className="material-icons">insert_drive_file</i>
							</div>
							<div className="col2">
								<p>Indefinido</p>
							</div>
						</div>
						
					</div>
						
					
					
				</div>
				
				
				
				<div className="body">
					
					<div className="description">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea odio vel totam deleniti laborum inventore explicabo excepturi dolorem eum. Culpa repudiandae molestias temporibus modi numquam officiis reiciendis quisquam in cumque.
					</div>
					
				</div>
				
				
				
			</div>
			
		);
	};
}
