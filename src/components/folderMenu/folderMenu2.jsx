import React from "react";
import StatusTranslator from "../statusTranslator/statusTranslator"
import './folderMenu.scss'

class FolderMenu extends React.Component {
  
    constructor (props) {
      super(props);

        this.state = {
            status:"",
            filteredCandidates:[]
        }

    }
    translateStatus(status){
        switch(this.props.status){
            case 0:
              
              this.setState({status:"Pendiente"}) 
              break
            
            case 1:
              console.log("case 1") 
              this.setState({status:"En revisión"})
              break
              
            case 2: 
            console.log("case 2")
              this.setState({status:"Rechazado"})
              break
            
            case 3: 
            console.log("case 3")
              this.setState({status:"Aceptado"})
              break
            
            default: 
              break
     
      }
    }

    getCandidateInfo = (section) => {
       
        let candidatesArray = this.props.candidates
        let filteredCandidates
       
        console.log ("el status de filtro es "+section ); 
        if(candidatesArray[0]){

            
            filteredCandidates = candidatesArray[0].filter(candidate => candidate._status == section)

            this.setState({

                filteredCandidates: filteredCandidates
    
            })

       
        }    
        
    }

   


    componentDidMount(){
        
        this.setState({
            status:""
        })
        this.getCandidateInfo(0);
       

    }
  
    render () { 
        
        
        let candidatesArray = this.state.filteredCandidates.map(candidate=>
			<span  className="results" >

				<p className="fields field1">{candidate.name?candidate.name:""}</p>
				<p className="fields field2">{candidate.surname?candidate.surname:""}</p>
				<p className="fields field3">{candidate.email?candidate.email:""}</p>
				<p className="fields field4">{candidate.nif?candidate.nif:""}</p>
				<p className="fields">{candidate._offerTitle?candidate._offerTitle:""}</p>
				

			</span>)

        return (
            <div className="companyMenu">
				<div className="companyMenuLinks">

          
					<p className="menuLink" onClick={()=>this.getCandidateInfo(0)}>Pendiente</p>
					<p className="menuLink" onClick={()=>this.getCandidateInfo(1)}>Revision</p>
					<p className="menuLink" onClick={()=>this.getCandidateInfo(2)}>Rechazado</p>
				</div>
				<div className="companyMenuResults">
        <div className="fieldNames"><p>Nombre</p><p>Apellidos</p><p>Email</p><p>NIF</p><p>Oferta</p></div>
					{candidatesArray}
				</div>
			</div>        
        )
     }
    
  }

  export default FolderMenu;