import React from "react";


class StatusTranslator extends React.Component {

  
    constructor (props) {
      super(props);
    
    }
    componentWillReceiveProps(){
    
      this.translateStatus()
    
    }

    componentDidMount(){
      console.log("el status es didmount " + this.props.status)
      this.translateStatus()
        
    }


    translateStatus = (status) => {
      
      switch(this.props.status){
        case 0:
          console.log("case 0")
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
  
    render () { 

      
        
        return(
            
            <p className="field">
                {this.state?.status}
            </p>
        
            )
        }

    }      

  export default StatusTranslator;