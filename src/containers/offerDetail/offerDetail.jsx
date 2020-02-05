
import React, {  } from "react";

import "./offerDetail.scss";

import { Button } from '@material-ui/core';
import ImageLabor from "../../components/image/image";
import { connect } from "react-redux";
import { getUrl, translateWorkday, numToStr, cache } from "../../utils/uti";
import axios from "axios";



class OfferDetail extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			
			alreadyApplied: true,
			
		};
		
	};
	
	
	
	async pulsaInscribirse() {
		
		if (! this.props.session.uid) {
			return console.error( "Se ha intentado aplicar a una oferta sin tener una UID." );
		};
		
		
		
		try {
			
			this.setState({ applied: true });
			axios.post( getUrl(`/offer/apply/${this.props.offerData.id}/${this.props.session.uid}`) );
			
		} catch (err) {
			
			console.log( err );
			
		};
		
		
	};
	
	
	
	async componentDidMount() {
		
		try {
			
			// Pido todas las ofertas en las que estoy inscrito
			let offers = await cache("appliedOffers", {uid: this.props.session.uid});
			
			
			// Busco la oferta actual entre las que estoy inscrito
			let applied = false;
			
			for (let _x of offers) {
				if (this.props.offerData.id === _x.id) {
					applied = true;
					break;
				};
			};
			
			
			
			// Establezco el estado
			this.setState({ alreadyApplied: applied });
			
			
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
						
						<div className="image mr3 flex-dir-c">
							
							<ImageLabor
								className="br"
								src="https://cdn.vox-cdn.com/thumbor/0n6dqQfk9MuOBSiM39Pog2Bw39Y=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19341372/microsoftedgenewlogo.jpg"
								w={100}
								alt="imagen de la empresa"
								measure="px"
								br={15}
							/>
							
							<p className="vacantes">{this.props.offerData.vacants} { (this.props.offerData.vacants > 1) ? "vacantes": "vacante" }</p>
							
						</div>
						
						
						
						<div className="companyInfo jcc">
							
							<h1>{this.props.offerData.title}</h1>
							<h2>{this.props.offerData._companyName}</h2>
							
							<div className="botonInscribirse flex jcfe">
								
								{ this.state.alreadyApplied ? 
									<Button
										disabled
										className="buttonApply"
										variant="contained"
										color="secondary"
										onClick={ () => this.pulsaInscribirse() }
									>
										Ya inscrito
									</Button>
									
									:
									
									<Button
										className="buttonApply"
										variant="contained"
										color="secondary"
										onClick={ () => this.pulsaInscribirse() }
									>
										Inscribirse
									</Button>									
								}
								
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
								<p> { numToStr(this.props.offerData.min_salary) } - { numToStr(this.props.offerData.max_salary) } €</p>
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
								<i className="material-icons">hourglass_full</i>
							</div>
							<div className="col2">
								<p>{ translateWorkday(this.props.offerData.workday) }</p>
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
