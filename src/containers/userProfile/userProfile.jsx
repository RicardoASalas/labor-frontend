import React from "react";
import axios from "axios";
import { getUrl, /*session*/ } from "../../utils/uti";
import SkillChip from "../../components/skillChip/skillChip"
// import EditIcon from "../../components/image/image"
import TextField from "@material-ui/core/TextField";
import { FormControl, /*Button, Radio, RadioGroup, FormControlLabel*/ } from '@material-ui/core';
import { connect } from "react-redux";


import "./userProfile.scss";


class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: this.props.session,
            userSkills:[],
            userOffers:[],
            isCompany: false,
            editProfileMode: false,
            
        };
    }

    c_input = (label, type, stateKey) => {
		
		// let errTxt = this.state?.[`err_${stateKey}`];
		// let err = !! errTxt;
		
		
		return (
			
			<FormControl className="mt1 mr1">
				<TextField 
					// error={ err }
					// helperText={ errTxt }
					// id="outlined-basic"
					type={type}
					label={label}
					variant="outlined"
					onChange={ (ev) => this.setChanges(ev, stateKey) }
					value={this.state[stateKey] ? this.state[stateKey] : ""}
				/>
			</FormControl>
			
		);
		
	};
    
    editProfileMode = () => {
        this.setState({
            editProfileMode:!this.state.editProfileMode
        })
    } 

    setChanges = (ev, stateKey) => {
        

            this.setState({ [stateKey]: ev.target.value });

        
    }
    
     async saveChanges(){
         let editUserData = {}

         if(this.state.name){
             editUserData.name = this.state.name;
         }
         if(this.state.surname){
             editUserData.surname = this.state.surname;
         }

         if(this.state.email){
            editUserData.email = this.state.email;
        }
        if(this.state.province){
            editUserData.province = this.state.province;
        }

        if(this.state.city){
            editUserData.city = this.state.city;
        }

        try {
            // let token = session.get().token;
            // let id = session.get().userId;
			let uid="e5e361cea4952c"
            // const res = await axios.get(getUrl(`/user/${id}?token=${token}`));
            const res = await axios.post(getUrl(`/user/editProfile/${uid}`), editUserData);
            console.log("la respuesta de la peticion es "+res.data)
            this.setState({ userData: res.data }, () => {
                // this.state.userType = this.state.userData.userType === 0 ? "Cliente" : "Vendedor";
            });

            this.setState({
                editProfileMode:false
            })

            this.showData();
           
        } catch (err) {
            console.error(err);
        } 
    }

    async getAplyedOffers(){
        
            try {
                // let token = session.get().token;
                // let id = session.get().userId;
    
                let uid="e5e361cea4952c" // ELIMINAR ESTA VARIABLE CUANDO SE IMPLEMENTE LA UID EN URL
                let res;
                if(!this.state.isCompany){

                    // const res = await axios.get(getUrl(`/user/${id}?token=${token}`));
                    res = await axios.get(getUrl(`/offer/aplyed/${uid}`));
                }
                console.log(res)
                console.log("la respuesta de la peticion es "+res.data)
                this.setState({ userOffers: res.data }, () => {
                    // this.state.userType = this.state.userData.userType === 0 ? "Cliente" : "Vendedor";
                });
               
            } catch (err) {
                console.error(err);
            }
       
    }

    async showData(){

        try {
            // let token = session.get().token;
            // let id = session.get().userId;

			let uid="e5e361cea4952c" // ELIMINAR ESTA VARIABLE CUANDO SE IMPLEMENTE LA UID EN URL

            // const res = await axios.get(getUrl(`/user/${id}?token=${token}`));
            const res = await axios.get(getUrl(`/user/${uid}`));
            console.log(res)
            console.log("la respuesta de la peticion es "+res.data)
            this.setState({ userData: res.data }, () => {
                // this.state.userType = this.state.userData.userType === 0 ? "Cliente" : "Vendedor";
            });
           
        } catch (err) {
            console.error(err);
        }

        this.getAplyedOffers();
    }

    componentDidMount() {        
        
        
        this.showData()
        
    }
	
	
	
    render() {
        
        // let userType = this.state.userData.userType === 1 ? "Empleado" : "Empresa";

        // if (this.state.userData.userType === 3){
        //     userType = "Administrador";
        // };
		let editName;
		let editSurname;
		let editEmail;
		let editProvince;
		let editCity;
		
		let saveChanges;
		
		
		
        if(!this.state.editProfileMode){

            editName = this.state.userData.name;
            editSurname = this.state.userData.surname;
            editEmail = this.state.userData.email;
            editProvince = this.state.userData.province;
            editCity = this.state.userData.city;

        }else{

            editName = this.c_input(this.state.userData.name, "text", "name");
            editSurname = this.c_input(this.state.userData.surname, "text", "surname");
            editEmail = this.c_input(this.state.userData.email, "email", "email");
            editProvince = this.c_input(this.state.userData.province, "text", "province");
            editCity = this.c_input(this.state.userData.city, "text", "city");
            saveChanges = <img
            className="editIcon"
            src="data:image/png;base64,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" 
            alt="icono editar perfil"

            onClick={()=>this.saveChanges()}
        />
        }

        let employeesSection="";

        if(this.state.isCompany){

            employeesSection=<div className="cardUserDescription mt2 pt3 pb3 pl5 pr5 aic jcc br flex-dir-r" >
                                <p>{this.state.userData.description}</p>
                            </div> 
        }

        let offers = this.state.userOffers.map(offer =>
            

            <div className="resultCard pt2 mb2  flex-dir-r pb2 pr2 br">
				
				{/* <div className="offerContainer col1 flex-dir-c"> */}
					
					<div className="offerImage">
						<img className="avatar" src={ offer.avatarUrl ? offer.avatarUrl : "/img/companyLogoPlaceholder.png" }alt="Imagen de la empresa"/>
					</div>
				{/* </div> */}
				
				<div className="infoOfferContainer col2 flex-dir-c">
                    {/* <div className="crossContainer">
                        
                        <ImageLabor
                        className="addSkill br ml3 mb3 "
                        src="https://simbologiadelmundo.com/wp-content/uploads/2016/06/08.png"
                        w={20}
                        alt="cancelar oferta"
                        measure="px"
                        br={50}
                        onClick={()=>this.cancelOffer()}
                    />
                    </div> */}
                    
                   
					<h2 className="title">{ offer.title }</h2>
				    <h2 className="companyName pb1">{ offer.companyName }</h2>
					
					<div className="row1 flex-dir-r pb2">
						<div className="offerInfo pt2 pb2">
							{ offer.city }  |  { offer.updated_At }
						</div>
					</div>
					
					<div className="row2 pt3 flex-dir-r">
						<div className="offerInfo pt2 pb2">
							{ offer.pivot.status } |  {offer.min_salary}
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
                    
                        <div className="userAvatarContainer">
                                <img className="avatar" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="Imagen de usuario"/>
                        </div>
                        <div className="userDataFieldContainer">
                            <div className="userDataField">
                
                                <div className="userDataFieldContent"><p className="bigField">{ editName }</p><p className="bigField">
							        { editSurname }</p></div>
                                </div>
                                <div className="userDataField pb4">

                                    <div className="userDataFieldContent"><p className="mediumField ">{ editEmail }</p></div>
                                    <div className="userDataFieldContent"><p className="mediumField">{ editProvince }</p></div>
                                    <div className="userDataFieldContent"><p className="mediumField">{ editCity }</p></div>
                    
                                </div>
           
                        </div>
                        <div className="editIconContainer">

                        <img
                        className="editIcon"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/OOjs_UI_icon_edit-ltr-progressive.svg/1024px-OOjs_UI_icon_edit-ltr-progressive.svg.png" 
                        alt="icono editar perfil"
                        onClick={()=>this.editProfileMode()}
                    />
                    {saveChanges}

                    </div> 
                    
                </div>
                <div className="cardUserEducation mt2 pt3 pr3 pb3 pl3 br flex-dir-r" >
                    <div className="addSkillContainer">
                        </div>
                            <SkillChip skills = {this.state.userSkills}  /> 
                        </div>
                    <div className="cardUserDescription mt2 pt3 pb3 pl5 pr5 aic jcc br flex-dir-r" >
                        <p>{this.state.userData.description}</p>
                    </div>
                    {employeesSection}
                    
                </div>
                <div className="cardUserOffer mr3 br">
                    {offers}
                
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
export default connect(mapStateToProps) (Profile);
