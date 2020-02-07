import React from "react";
import axios from "axios";
import { getUrl, /*session*/ } from "../../utils/uti";
import SkillChip from "../../components/skillChip/skillChip";
import InputChips from "../../components/inputChips/inputChips";
import DropdownProvinceList from "../../components/dropdownProvinces/dropdownProvinces";
import CompanyFolderMenu from "../../components/folderMenu/folderMenu2";

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
            skillList:[],
            isCompany: true,
            editProfileMode: false,
        };
    }

    componentDidMount() {        
        
        console.log(this.props.session)
        this.showData()
        this.getSkillsList()
        
    }
    

    async showData(){
        //hace una peticion a la api por medio de axios con filtro de uid y almacena en el estado userData
        // un objeto con los datos de usuario.
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

        //Llama a la funcion getAppliedOffers

        this.getOffers();

        this.getSkills()
         
    }


    async getOffers(){

        //Hace una peticion a la api del back que obtiene como resultado un array de objetos offerta a los 
        //que esta subscrito el usuario loggeado y lo almacena en el estado userOffers.

            try {
               
                let uid = this.props.session.uid 
                let res1
                let res2
                if(!this.state.isCompany){

                    // const res = await axios.get(getUrl(`/user/${id}?token=${token}`));
                    res1 = await axios.get(getUrl(`/offer/applied/${uid}`));

                    console.log("la respuesta de la peticion de ofertas "+res1.data)

                    this.setState({ userOffers: res1.data }, () => {
                        // this.state.userType = this.state.userData.userType === 0 ? "Cliente" : "Vendedor";
                    });


                }
                else{

                    // const res = await axios.get(getUrl(`/user/${id}?token=${token}`));
                    res1 = await axios.get(getUrl(`/offer/created/${uid}`));

                    console.log("la respuesta de la peticion de ofertas "+res1.data)


                    res2 = await axios.get(getUrl(`/offer/candidates/${uid}`));

                    console.log("la respuesta de la peticion de candidatos "+res2.data)
                    
                    this.setState({ 
                        userOffers: res1.data,
                        candidates: res2.data
                    });

                    
                }
                
               
            } catch (err) {
                console.error(err);
            }
       
    }

    async getSkills(){

        //Hace una peticion a la api del back que obtiene como resultado un array de objetos skills a los 
        //que esta subscrito el usuario loggeado y lo almacena en el estado userSkills.
            let res
            
            try {
               
                let uid = this.props.session.uid 
                
                if(!this.state.isCompany){

                    // const res = await axios.get(getUrl(`/user/${id}?token=${token}`));
                    res = await axios.get(getUrl(`/skill/applied/${uid}`));

                    this.setState({userSkills: res.data })

                }   
               
            } catch (err) {
                console.error(err);
            }            
            
            
                
    }

    async getSkillsList(){

        //Hace una peticion a la api del back que obtiene como resultado un array de skills disponibles
        let res
            
        try {
           
            
            if(!this.state.isCompany){

               
                res = await axios.get(getUrl('/skill'));

            }   
           
        } catch (err) {
            console.error(err);
        }      
        
        if(!this.state.isCompany){

            console.log(res.data)
        
            this.setState({skillList: res.data })

        }
        
    }


    
    editProfileMode = () => {

        //Despues de presionar el boton de editar, cambia el estado editProfileMode al estado contrario 
        //al que estababa anteriormente

        this.setState({
            editProfileMode:!this.state.editProfileMode
        })
    } 



    setChanges = (ev, stateKey) => {
        
            //Crea el estado con nombre de campo pasado por parametro y valor regogido en el input de edición.

            this.setState({ [stateKey]: ev.target.value });

        
    }

    
     async saveChanges(){

        //Comprueba si existe this.state.*, si existe es que se ha editado el campo a traves del input
        //y entra en el condicional almacenando en el objeto que se mandara al back el nuevo valor

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
            editUserData.avatar_url = this.state.avatar;
        }
        if(this.state.userData.description){
            editUserData.description = this.state.userData.description;
        }

        try {
            
            let uid = this.props.session.uid

            console.log(editUserData)
            console.log(uid)
            
            // const res = await axios.get(getUrl(`/user/${id}?token=${token}`));
            const res = await axios.post(getUrl(`/user/editProfile/${uid}`), editUserData);

            // si se ha creado el estado selecteSkills es que se han hecho cambios y por lo tanto se
            //dispara la peticion
            if(this.state.selectedSkills){

                let skillsArray = [];
                let selectedSkills = this.state.selectedSkills
                let body={};
                
                // preparamos el array de skillsId
                selectedSkills.forEach(element => {
                    skillsArray.push(element.id)
                });
                    
                body={skill: skillsArray}
            
                console.log(selectedSkills)
                console.log(skillsArray)
                //hacemos la peticion mandando por url el array de skills y el uid
                const res = await axios.post(getUrl(`/skill/apply/${uid}`), body);
                this.setState({userSkills: res.data})
            }


            this.setState({ userData: res.data }, () => {
                // this.state.userType = this.state.userData.userType === 0 ? "Cliente" : "Vendedor";
            });
            
            console.log("llega aqui")
            this.setState({
                editProfileMode:false
            })


            this.showData();
           
        } catch (err) {
            console.error(err);
        } 
    }

    
    
    c_input = (label, type, stateKey) => {
		
		// let errTxt = this.state?.[`err_${stateKey}`];
		// let err = !! errTxt;
    	
		
		return (
			
			<FormControl >
				<TextField 
					// error={ err }
					// helperText={ errTxt }
					// id="outlined-basic"
					type={type}
					label={label}
                    variant="outlined"
                    disableUnderline={true}
					onChange={ (ev) => this.setChanges(ev, stateKey) }
					value={this.state[stateKey] ? this.state[stateKey] : ""}
				/>
			</FormControl>
			
		);
		
	}; 
    

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
        let section;
        let editAvatar;
		let saveChanges;
		
		
		
        if(!this.state.editProfileMode){

            editName = this.state.userData.name;
            editSurname = this.state.userData.surname;
            editEmail = this.state.userData.email;
            editProvince = this.state.userData.province;
            editCity = this.state.userData.city;
            if(!this.state.isCompany){

                section = (this.state.userSkills.length === 0)
                        ?
                        <p/>
                        :<SkillChip className = "chipsContainer" skills = {this.state.userSkills}  
                        />

            }
            

            editDescription = this.state.userData.description;
            editAvatar = <img 
            className="avatar" 
                        src={this.state.userData.avatar_url != ""? this.state.userData.avatar_url:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} 
                        alt="Imagen de usuario"
                    /> ;

        }else{

            editName = this.c_input("Nombre", "text", "name" );
            editEmail = this.c_input("Email", "email", "email");
            editAvatar = this.c_input("Avatar link", "text", "avatar");
            if(!this.state.isCompany){
            editProvince = <DropdownProvinceList
                            className= "provinceDropdown"
							label="Provincia"
							defaultOption="Selecciona una provincia"
							onChange={ (ev) => {
								this.setState({province : ev.target.value});
							}}
							helperText={this.state.err_province}
                            />
            editCity = this.c_input("Ciudad", "text", "city");
            editSurname = this.c_input("Apellidos", "text", "surname");
            

            

                section = <InputChips
                    defaultValue={this.state.userSkills}
                    optionsLabelKey="name"
                    
                    label="Habilidades"
                    placeholder="Escribe una habilidad"
                    onChange={ (ev, value) => this.setState({ selectedSkills: value }) }
                    options={this.state.skillList}
                    />

            }
            
            

            editDescription =
            <TextField
						className=" editDescriptionBox"
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

            saveChanges = <i class="material-icons editIcon"
                            alt="icono editar perfil"
                            onClick={()=>this.saveChanges()}
                            >
                                save
                            </i>
        }

        let employeesSection="";

        if(this.state.isCompany && this.state.candidates){
                console.log("los candidatos son"+this.state.candidates)

                section=<CompanyFolderMenu candidates={this.state.candidates ? this.state.candidates:""}/>
                               
        }

        let offers 

        if (this.state.userOffers.length > 0){

        offers = this.state.userOffers.map(offer =>
            

            <div className="resultCard pt2 mb2  flex-dir-r pb2 pr2 br">
					
					<div className="offerImage">
						<img className="avatar" src={ offer._companyAvatar ? offer._companyAvatar : "/img/companyLogoPlaceholder.png" } alt="Imagen de la empresa"/>
					</div>
				
				<div className="infoOfferContainer col2 flex-dir-c">
                    
                   
					<h2 className="title">{ offer.title }</h2>
				    <h2 className="companyName pb1">{ offer._companyName }</h2>
					
					<div className="row1 flex-dir-r pb2">
						<div className="offerInfo pt2 pb2">
							{ offer.city }  |  { offer.updated_At }
						</div>
					</div>
					
					<div className="row2 pt3 flex-dir-r">
						<div className="offerInfo pt2 pb2">
							{ (this.state.isCompany == false) ? offer.pivot.status : offer.created_at } |  {offer.min_salary} - {offer.max_salary} €
						</div>
					</div>
				</div>
			</div>
        )
     
        }
        else{
            
            if(!this.state.isCompany){
                offers = <p className="blackField">Aún no te has suscrito a ninguna oferta</p>
            }
            else{
                offers = <p className="blackField">Aún no has creado ninguna oferta</p>
            }
           
        }

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
                                { editAvatar }
                        </div>
                        <div className="userDataFieldContainer">
                            <div className="userDataField pt3">
                
                                <div className="userDataFieldContent"><p className="bigField">{ editName }</p><p className="bigField">
							        { editSurname }</p></div>
                                </div>
                                <div className="userDataField ">

                                    
                                    <div className="userDataFieldContent"><p className="mediumField">{ editProvince }</p></div>
                                    <div className="userDataFieldContent"><p className="mediumField">{ editCity }</p></div>
                    
                                </div>
                                <div className="userDataField pb4">
                                    <div className="userDataFieldContent"><p className="mediumField ">{ editEmail }</p></div>
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
                        
                        {section}

                           
                        </div>
                    <div className="cardUserDescription mt2 pt3 pb3 pl5 pr5 aic jcc br flex-dir-c" >
                        <p className="descriptionBox mt2 ml2">{editDescription}</p>
                    </div>
                    {employeesSection}
                    
                </div>
                <div className={(this.state.userOffers.length > 0)?"cardUserOffer mr3 br":"cardUserOfferEmpty mr3 br"}>
                    
                    { offers }
                
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
