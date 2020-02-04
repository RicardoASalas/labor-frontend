
import React, {  } from "react";

import "./offerDetail.scss";

import { Button } from '@material-ui/core';
import ImageLabor from "../../components/image/image";
import { connect } from "react-redux";
import { getUrl } from "../../utils/uti";
import axios from "axios";



class OfferDetail extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			
		};
		
	};
	
	
	
	async pulsaInscribirse() {
		
		if (! this.props.session.uid) {
			return console.error( "Se ha intentado aplicar a una oferta sin tener una UID." );
		};
		
		
		
		try {
			
			let res = axios.post( getUrl(`/offer/apply/${this.props.offerData.id}/${this.props.session.uid}`) );
			console.log( res );
			
		} catch (err) {
			
			console.log( err );
			
		};
		
		
	};
	
	
	
	render() {
		
		if (! this.props.offerData) {
			return (
				"Recarga"
			)
		};
		
		
		
		return (
			
			<div className="offerDetailMain">
				
				<div className="header br flex-dir-c">
					
					<div className="flex-dir-r">
						
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
							
							<h1>{this.props.offerData.title}</h1>
							<h2>{this.props.offerData._companyName}</h2>
							
							<div className="botonInscribirse flex jcfe">
								<Button
									className="buttonApply"
									variant="contained"
									color="secondary"
									onClick={ () => this.pulsaInscribirse() }
								>
									Inscribirse
								</Button>
							</div>
							
						</div>
						
					</div>
					
					
					
					
					
				</div>
				
				
				
				<div className="header br flex-dir-r">
					
					<div className="offerInfo flex-dir-r">

						<div className="info flex-dir-r aic">
								<div className="col1 mr1">
									<i className="material-icons">location_city</i>
								</div>
								<div className="col2">
									<p>{this.props.offerData.city}, {this.props.offerData.province} (España)</p>
								</div>
						</div>
						
						<div className="info flex-dir-r aic">
								<div className="col1 mr1">
									<i className="material-icons">calendar_today</i>
								</div>
								<div className="col2">
									<p>{this.props.offerData.created_at}</p>
								</div>
						</div>
						
						<div className="info flex-dir-r aic">
							<div className="col1 mr1">
								<i className="material-icons">euro_symbol</i>
							</div>
							<div className="col2">
								<p> {this.props.offerData.min_salary} - {this.props.offerData.max_salary} €</p>
							</div>
						</div>
						
						<div className="info flex-dir-r aic">
							<div className="col1 mr1">
								<i className="material-icons">emoji_events</i>
							</div>
							<div className="col2">
								<p>{this.props.offerData.experience}</p>
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
						{this.props.offerData.description}
					</div>
					
				</div>
				
				
				
			</div>
			
		);
	};
};



const mapStateToProps = (state) => { // ese state es de redux
	return ({
		offerData: state.offerData,
		session: state.session,
		
	})
};

export default connect(mapStateToProps) (OfferDetail);