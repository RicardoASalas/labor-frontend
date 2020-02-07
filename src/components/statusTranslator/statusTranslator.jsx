import React from "react";


class StatusTranslator extends React.Component {

  
    constructor (props) {
      super(props);
      this.state={
          status:""
      }
    }
  
    render () { 

       
        switch(this.props.status){
          case 0: 
            this.setState({status:"Pendiente"}) 
            break
          
          case 1: 
            this.setState({status:"En revisión"})
            break
            
          case 2: 
            this.setState({status:"Rechazado"})
            break
          
          case 3: 
            this.setState({status:"Aceptado"})
            break
          
          default: 
            break
        }

        let status=this.state.status
        return(
            
            <p className="field">
                {status}
            </p>
        
            )
        }

    }      

  export default StatusTranslator;