import React from "react";

import axios from "axios";
import { getUrl, session } from "../../utils/uti";
import DataProfile from "./profile.json"
import DataSkills from "./skills.json"
import DataOffers from "./offers.json"

import "./profile.scss";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: {},
            userSkills:[],
            userOffers:[],
            userType: 1
        };
    }
	
    async componentDidMount() {



        this.setState({
            userData: DataProfile,
            userSkills: DataSkills,
            userOffers: DataOffers
        });

        console.log(DataProfile)
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
        console.log(Object.values(this.state.userData))
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
                <div className="cardUserEducation mt2 br flex-dir-r" >
                    
                   
                </div>
                <div className="cardUserDescription mt2 br flex-dir-r" >
                    
                    
                </div>
                </div>
                <div className="cardUserOffer mr3 br">
                <div className="resultCard pt3 pb3 pr3 flex-dir-r mb2">
				
				<div className="col1 flex-dir-c">
					
					<div className="image">
						<ImageLabor
							className="br"
							src={ this.props.img ? this.props.img : "/img/companyLogoPlaceholder.png" }
							w={100}
							alt="imagen de la empresa"
							measure="px"
							br={15}
						/>
					</div>
				</div>
				
				<div className="col2 flex-dir-c">
					
					<h2 className="title">{ this.props.title }</h2>
					<h2 className="companyName pb1">{ this.props.companyName }</h2>
					
					<div className="row1 flex-dir-r pb2">
						<div className="offerInfo pt2 pb2">
							{ this.props.city }  |  { this.props.date }
						</div>
					</div>
					
					<p className="description">{ this.props.description }</p>
					
					<div className="row2 pt3 flex-dir-r">
						<div className="offerInfo pt2 pb2">
							{ this.props.contractType } | {hoursWeek} | {salary}
						</div>
					</div>
					
					
				</div>
				
			</div>
			
		);
                
                </div>
            </div>
        );
    }
}
export default Profile;
