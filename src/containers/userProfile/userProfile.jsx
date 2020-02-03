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
            userData: {},
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
        if(this.state.avatar){
            editUserData.avatar_url = this.state.avatar_url;
        }
        if(this.state.userData.description){
            editUserData.description = this.state.userData.description;
        }

        try {
            
            let uid = this.props.session.uid
            
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
               
                let uid = this.props.session.uid // ELIMINAR ESTA VARIABLE CUANDO SE IMPLEMENTE LA UID EN URL
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

			let uid = this.props.session.uid

            // const res = await axios.get(getUrl(`/user/${id}?token=${token}`));
            const res = await axios.get(getUrl(`/user/${uid}`));

            console.log("la respuesta de la peticion es "+res.data)

            this.setState({ userData: res.data, editedData: res.data }, () => {
                // this.state.userType = this.state.userData.userType === 0 ? "Cliente" : "Vendedor";
            });
           
        } catch (err) {
            console.error(err);
        }

        this.getAplyedOffers();
    }

    componentDidMount() {        
        
        console.log(this.props.session)
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
        let editDescription;
        let editAvatar;
		
		let saveChanges;
		
		
		
        if(!this.state.editProfileMode){

            editName = this.state.userData.name;
            editSurname = this.state.userData.surname;
            editEmail = this.state.userData.email;
            editProvince = this.state.userData.province;
            editCity = this.state.userData.city;
            editDescription = this.state.userData.description;
            editAvatar = this.state.userData.avatar_url;

        }else{

            editName = this.c_input(this.state.userData.name, "text", "name" );
            editSurname = this.c_input(this.state.userData.surname, "text", "surname");
            editEmail = this.c_input(this.state.userData.email, "email", "email");
            editProvince = this.c_input(this.state.userData.province, "text", "province");
            editCity = this.c_input(this.state.userData.city, "text", "city");
            editAvatar = this.c_input(this.state.userData.avatar_url, "text", "avatar_url");;
            editDescription = //<input type = "text" className="descriptionBox" placeholder={this.state.userData.description}></input>7
            <TextField
						className=" descriptionBox"
                        variant="outlined"
						multiline
						// label="Descripción"
                        rows="8"
                        placeholder={this.state.userData.description}
						// defaultValue=""
                        onChange={ (ev) => this.setState({userData:{...this.state.userData, description: ev.target.value}  }) }
						value={this.state.userData.description}
						// helperText={this.state.err_description}
						// error={!! this.state?.err_description}
					/>					

            editAvatar = this.c_input(this.state.userData.avatar_url, "text", "avatar");

            saveChanges = <i class="material-icons editIcon"
                            alt="icono editar perfil"
                            onClick={()=>this.saveChanges()}
                            >
                                save
                            </i>
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

                        <i className="material-icons editIcon"
                        alt="icono editar perfil"
                        onClick={()=>this.editProfileMode()}
                        >
                            edit
                        </i>
                        
                    {saveChanges}

                    </div> 
                    
                </div>
                <div className="cardUserEducation mt2 pt3 pr3 pb3 pl3 br flex-dir-r" >
                    <div className="addSkillContainer">
                        </div>
                            <SkillChip skills = {this.state.userSkills}  /> 
                        </div>
                    <div className="cardUserDescription mt2 pt3 pb3 pl5 pr5 aic jcc br flex-dir-c" >
                        <p className="descriptionBox">{editDescription}</p>
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
