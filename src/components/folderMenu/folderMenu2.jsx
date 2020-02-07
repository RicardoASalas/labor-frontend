import React from "react";
import StatusTranslator from "../statusTranslator/statusTranslator"
import './folderMenu.scss'

class FolderMenu extends React.Component {
  
    constructor (props) {
      super(props);

        this.state = {
            candidates:props.candidadtes,
            filteredCandidates:[]
        }

    }

    getCandidateInfo = (section) => {
       
        let candidatesArray = this.props.candidates
        let filteredCandidates
       
        // console.log ( candidatesArray[0][0].pivot.status ); 
        if(candidatesArray[0]){

            filteredCandidates = candidatesArray[0].map(candidate => console.log(candidate._status))
            filteredCandidates = candidatesArray[0].filter(candidate => candidate._status === section)

            this.setState({

                filteredCandidates: filteredCandidates
    
            })

       
        }

        
        
    }

    componentDidMount(){
        
        this.setState({

            candidates: this.props.candidates

        })
        
        this.getCandidateInfo(0);

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