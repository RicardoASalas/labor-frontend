import React from "react";
import axios from "axios";
import { getUrl, session } from "../../utils/uti";
import DataProfile from "./profile.json"
import DataSkills from "./skills.json"
import DataOffers from "./offers.json"
import SkillChip from "../../components/skillChip/skillChip"

import "./userProfile.scss";


class Profile extends React.Component {
    constructor() {
        super();

        this.state = {
            userData: DataProfile,
            userSkills:DataSkills,
            userOffers:DataOffers,
            userType: 1
        };
    }

    cancelOffer = () =>{


    }
	
    componentDidMount() {

        

        // this.setState({
        //     userData: DataProfile,
        //     userSkills: DataSkills,
        //     userOffers: DataOffers
        // });
        
        
        // try {
        //     let token = session.get().token;
        //     let id = session.get().userId;
			
        //     const res = await axios.get(getUrl(`/user/${id}?token=${token}`));
			
        //     this.setState({ userData: res.data }, () => {
        //         // this.state.userType = this.state.userData.userType === 0 ? "Cliente" : "Vendedor";
        //     });
        // } catch (err) {
        //     console.error(err);
        // }
    }
	
	
	
    render() {
        
        // let userType = this.state.userData.userType === 1 ? "Empleado" : "Empresa";

        // if (this.state.userData.userType === 3){
        //     userType = "Administrador";
        // };
        
        let offers = this.state.userOffers.map(offer =>
            <div className="resultCard pt2 mb2  flex-dir-r pb2 pr2 br">
				
				{/* <div className="offerContainer col1 flex-dir-c"> */}
					
					<div className="offerImage">
						<img className="avatar" src={ offer.avatarUrl ? offer.avatarUrl : "/img/companyLogoPlaceholder.png" }alt="Imagen de la empresa"/>
					</div>
				{/* </div> */}
				
				<div className="infoOfferContainer col2 flex-dir-c">
                    <div className="crossContainer">
                        <img className="closingCross" src="https://simbologiadelmundo.com/wp-content/uploads/2016/06/08.png" alt="Cancelar oferta"/>
                    </div>
                    

					<h2 className="title">{ offer.title }</h2>
				    <h2 className="companyName pb1">{ offer.companyName }</h2>
					
					<div className="row1 flex-dir-r pb2">
						<div className="offerInfo pt2 pb2">
							{ offer.city }  |  { offer.updateddAt }
						</div>
					</div>
					
					<div className="row2 pt3 flex-dir-r">
						<div className="offerInfo pt2 pb2">
							{ offer.contractType } |  {offer.salary}
						</div>
					</div>
					
					
				</div>
				
			</div>
        )
        
        return (
            <div className="main mainProfile">
                <div className="cardUserInformation mr2 br ">
                <div className="cardUserData br" >
                    {/* <div className="cardInfo">
                        <h1 className="cardTitle"> {this.state.userData.username} </h1>
                        <div className="userTypeClass">{userType}</div> 
                    </div> */}
                    {/* <div className="cardInformationFields .aifs "> */}
                        <div class="userAvatarContainer">
                                <img className="avatar" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="Imagen de usuario"/>
                        </div>
                            <div className="userDataFieldContainer">
                            <div className="userDataField">
                                
                                <div className="userDataFieldContent"><p className="bigField">{this.state.userData.name}</p><p className="bigField">{this.state.userData.surname}</p></div>
                            </div>
                            <div className="userDataField">
                                
                                <div className="userDataFieldContent"><p className="mediumField">{this.state.userData.email}</p></div>
                            </div>
                            <div className="userDataField">
                                
                                    <div className="userDataFieldContent">{this.state.userData.province}</div>
                                    <div className="userDataFieldContent">{this.state.userData.city}</div>
                                
                            </div>
                        </div> 
                    {/* </div> */}
                </div>
                <div className="cardUserEducation mt2 pt3 pr3 pb3 pl3 br flex-dir-r" >
                <SkillChip skills = {this.state.userSkills}  /> 
                </div>
                <div className="cardUserDescription mt2 pt3 pb3 pl5 pr5 aic jcc br flex-dir-r" >
                    
                <p>{this.state.userData.description}</p>
                </div>
                </div>
                <div className="cardUserOffer mr3 br">
                    {offers}
                
                </div>
            </div>
        );
    }
}
export default Profile;
