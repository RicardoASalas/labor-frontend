import React from "react";
import StatusTranslator from "../statusTranslator/statusTranslator"
import './folderMenu.scss'

class FolderMenu extends React.Component {

    
    
    getCandidateInfo = (section) => {
       
        let candidatesArray=this.state.candidates
        let filteredCandidates
       
        if(candidatesArray[0]){

            filteredCandidates = candidatesArray[0].filter(candidate => candidate._status === section)

       
        }

    
        

        this.setState({

            filteredCandidates: filteredCandidates

        })
        
    }

    componentDidMount(){
        
        this.setState({
            candidates: this.props.candidates
        })

    }
    
  
    constructor (props) {
      super(props);
      this.state = {
        candidates:[],
        filteredCandidates:[]
      }
    }
  
    render () { 
        

        let candidatesArray = this.state.filteredCandidates.map(candidate=>
			<span className="results">

				<p className="fields">{candidate.name?candidate.name:""}</p>
				<p className="fields">{candidate.surname?candidate.surname:""}</p>
				<p className="fields">{candidate.email?candidate.email:""}</p>
				<p className="fields">{candidate.nif?candidate.nif:""}</p>
				<p className="fields">{candidate._offerTitle?candidate._offerTitle:""}</p>
				<StatusTranslator status={candidate._status}/>

			</span>)

        return (
            <div className="companyMenu">
				<div className="companyMenuLinks">
					<p className="menuLink" onClick={()=>this.getCandidateInfo(0)}>Pendiente</p>
					<p className="menuLink" onClick={()=>this.getCandidateInfo(1)}>Revision</p>
					<p className="menuLink" onClick={()=>this.getCandidateInfo(2)}>Rechazado</p>
				</div>
				<div className="companyMenuResults">
					{candidatesArray}
				</div>
			</div>        
        )
     }
    
  }

  export default FolderMenu;