
import React, { Fragment } from "react";

import "./offerDetail.scss";

import { Button } from '@material-ui/core';
import ImageLabor from "../../components/image/image";
import { connect } from "react-redux";
import { getUrl, translateWorkday, numToStr, cache } from "../../utils/uti";
import axios from "axios";
import store from "../../redux/store";
// import SearchResultLabor from "../../components/searchResult/searchResult";
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SkillChip from "../../components/skillChip/skillChip";




class OfferDetail extends React.Component {
	
	constructor (props) {
		super(props);
		
		this.state = {
			
			alreadyApplied: true,

			
		};
		
	};

	async pulsaBorrar(){

		try {
			
			//borro la oferta
			axios.get( getUrl(`/offer/delete/${this.props.offerData.uid}`) );

			//redirijo a mi perfil de empresa
			this.props.history.push(`/profile/${this.props.session.uid}`)
			
			
			
		} catch (err) {
			
			console.log( err );
			
		};

	}
	
	async pulsaCancelar(){

		try {
			
			
			axios.get( getUrl(`/offer/cancel/${this.props.offerData.uid}/${this.props.session.uid}`) );
			cache("appliedOffers", {uid: this.props.session.uid}, "fresh")
			this.setState({ alreadyApplied: false });
			
		} catch (err) {
			
			console.log( err );
			
		};
	}
	
	async pulsaInscribirse() {
		
		
		if (! this.props.session.uid) {
			return console.error( "Se ha intentado aplicar a una oferta sin tener una UID." );
		};
		
		
		
		try {
			
			
			axios.post( getUrl(`/offer/apply/${this.props.offerData.uid}/${this.props.session.uid}`) );
			cache("appliedOffers", {uid: this.props.session.uid}, "fresh")
			this.setState({ alreadyApplied: true });
			
			
		} catch (err) {
			
			console.log( err );
			
		};
		
		
	};

	async cambiarStatus(userUid, status){
		try{

			await axios.get(getUrl(`/offer/status/${this.props.offerData.uid}/${userUid}/${status}`))

		}catch(err){

			console.log(err)

		}

	}
	
	
	
	pulsaPerfil(uid) {
		
			
			this.props.history.push(`/profile/${uid}`)


	};
	
	
	
	renderCandidates () {
		
		// Todavía no ha llegado el estado de candidatos
		if (! this.state.candidateList) return "";
		
		
		// Devuelvo
		return (
			
			<Fragment>
				
				{ 
					<h1 className="tac mb1">Candidatos inscritos</h1>
				}
				
				{
					this.state?.candidateList.map( (_x) => {
						
						if (_x.pivot.offer_id === this.props.offerData.id) {
							
							// return (
							// 	<SearchResultLabor
							// 		key={_x.uid}
							// 		img={_x.avatar_url}
							// 		title={`${_x.name} ${_x.surname}`}
							// 		companyName={_x.cv_url}
							// 		description={_x.description}
							// 		city={_x.city}
									
							// 		onClick={ () => this.pulsaPerfil(_x.uid) }
							// 	/>
							// );
							
							return (
								<div className="candidateContainer">
									<div className="botones flex-dir-r">
										
										<IconButton className="button"
											aria-label="aceptar candidato"
											color="primary"
											onClick={ () => this.cambiarStatus(_x.uid, 3) }
										>
											<CheckCircleIcon />
										</IconButton>
										
										<IconButton className="button"
											aria-label="aceptar candidato"
											color="primary"
											onClick={ () => this.cambiarStatus(_x.uid, 1) }
										>
											<VisibilityIcon />
										</IconButton>
										
										<IconButton className="button"
											aria-label="rechazar candidato"
											color="secondary"
											onClick={ () => this.cambiarStatus(_x.uid, 2) }
										>
											<CancelIcon />
										</IconButton>
										
									</div>
								<div
									className="resultCard br pt3 pb3 pr3 flex-dir-c mb2"
									onClick = { () => this.pulsaPerfil(_x.uid) }
								>
									
									<div
										className="hitbox flex-dir-r"
										
									>
										
										<div className="col1 flex-dir-c">
											
											<div className="image">
												<ImageLabor
													className="br"
													src={ _x.avatar_url ? _x.avatar_url : "/img/companyLogoPlaceholder.png" }
													w={100}
													alt="imagen del candidato"
													measure="px"
													br={15}
												/>
											</div>
										</div>
										
										<div className="col2 flex-dir-c">
											
											<h2 className="title">{`${_x.name} ${_x.surname}`}</h2>
											
											<div className="row2 flex-dir-r">
												<div className="offerInfo">
													{ _x.city } | {_x.province}
												</div>
											</div>
											
											<p className="descriptionCandidate pt2">{ _x.description }</p>
											
										</div>
										
										
										
									</div>
									
									
									
									
								
								</div>
								
								</div>
							)
							
						};
				
					})
				}
				
			</Fragment>
			
			
		)
		
	};
	
	async getSkills(){
		let skills
		try{
			// pido las skills de la oferta
			skills = await axios.get( getUrl(`/skill/applied/${this.props.offerData.uid}`))	
			
			// Establezco el estado
			this.setState({ 

				offerSkills: skills.data,
				
			});
			
		
		} catch (err) {
						
			console.log( err );
		};

	}
	
	async componentDidMount() {
		

		try {
			
			let offerUid = this.props.location.pathname.split("/")[3]
			
			
			if (this.props?.offerData.uid !== offerUid  ){

				//Si la uid recibida no coincide con la almacenada en cache se hace una nueva llamada a axios

				// let offerDetail = await cache(`http://localhost:3000/api/offer/find`, {offerUid});
				let offerDetail = await axios.post( getUrl(`/offer/find/`), {uid: offerUid});

				
				//Se guardan los datos de la oferta actual en redux
				store.dispatch({
					type: 'OFFER_DETAIL',
					payload: offerDetail.data[0]
				});

				

			}

				

			if (! this.props.session.is_company) {
				
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
				this.setState({ 
					alreadyApplied: applied
				 });
				
				
			} else {
				
				// Pido todos los candidatos
				let candidates = await axios.get(getUrl(`/offer/candidates/${this.props.session.uid}`));
				
				
				// Establezco el estado
				this.setState({ 

					candidateList: candidates.data[0] 
				});
				
				
			};
			
			
		} catch (err) {
			
			console.log( err );
			
		};	

		this.getSkills()
		
	};

	
	
	
	
	render() {
		
		if (! this.props.offerData) {
			return (
				"Recarga"
			);
		};
		
		
		if ( Object.keys(this.props.session).length === 0 ) {
			this.props.history.push("/login");
			
			return null;
		};
		
		
		
		return (
			
			<div className="offerDetailMain">
				
				<div className="header br flex-dir-c ">
					
					<div className="flex-dir-r">
						
						<div className="image mr3 flex-dir-c">
							
							<ImageLabor
								className="br"
								src={this.props.offerData._companyAvatar? this.props.offerData._companyAvatar : "/img/companyLogoPlaceholder.png"}
								w={100}
								alt="imagen de la empresa"
								measure="px"
								br={15}
							/>
							
							<p className="vacantes">{this.props.offerData.vacants} { (this.props.offerData.vacants > 1) ? "vacantes": "vacante" }</p>
							
						</div>
						
						
						
						<div className="companyInfo jcc">
							
							<h1>{this.props.offerData.title}</h1>
							<h2 onClick = { () => this.pulsaPerfil(this.props.offerData._companyUid) } className="goToCompanyProfile">{this.props.offerData._companyName}</h2>
							<div className ="buttonsOffer" >
							<div className="botonInscribirse flex jcfe m1">
								
					{!this.props.session.is_company
									?
									this.state.alreadyApplied 
									? 
									<Button
										disabled
										className="buttonApply "
										variant="contained"
										color="secondary"
										onClick={ () => this.pulsaInscribirse() }
									>
										Ya inscrito
									</Button>
									
									:
									
									<Button
										className="buttonApply "
										variant="contained"
										color="secondary"
										onClick={ () => this.pulsaInscribirse() }
									>
										Inscribirse
									</Button>									
								
								:
								<p/>
								}
							</div>
							<div className="botonInscribirse flex jcfe m1">
								
							{!this.props.session.is_company
									? 
									!this.state.alreadyApplied 
									? 
									<Button
										disabled
										className="buttonApply "
										variant="contained"
										color="secondary"
										onClick={ () => this.pulsaCancelar() }
									>
										cancelar
									</Button>
									
									:
									
									<Button
										className="buttonApply "
										variant="contained"
										color="secondary"
										onClick={ () => this.pulsaCancelar() }
									>
										Cancelar
									</Button>									
								:
								<Button
										className="buttonApply "
										variant="contained"
										color="secondary"
										onClick={ () => this.pulsaBorrar() }
									>
										borrar
									</Button>						
								}
								
							</div>
							</div>
							
							
						</div>
						
					</div>
					
					
					
					
					
				</div>
				
				
				
				<div className="header br flex-dir-r" >
					
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
				<div className="cardUserEducation mb2 mt2 pt3 pr3 pb3 pl3 br flex-dir-c" >
                            <p className="mb2 sectionTitle">Habilidades</p>
                            <div className="addSkillContainer">
                                </div>
                                
                                {
									
                                    (this.state.offerSkills)
                                    ?
                                    <SkillChip className = "chipsContainer" skills = {this.state.offerSkills}  
									/>
									:
									<p/>

								}

                                
                        </div>
				
				
				
				<div className="body">
					
					<div className="description">
						{this.props.offerData.description}
					</div>
					
				</div>
				
				
				{ this.props.session.uid === this.props.offerData._companyUid && 
					
					<div className="body">
						
						<div className="candidates">
							
							{this.renderCandidates()}
							
						</div>
						
					</div>
				}
				
				
				
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
