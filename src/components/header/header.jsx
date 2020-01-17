import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
// import axios from "axios";
import { connect } from "react-redux";

import "./header.scss";

// import { session, getUrl } from "../../utils/uti";
// import { login } from "../../redux/actions/users";
// import { rdx_productSearchResults } from "../../redux/actions/products";

import { Button, Input, Icon } from "antd";



class Header extends React.Component {
    constructor(props) {
        super(props);
		
		
        this.state = {
			
			
		};
		
		
		// this.handleChange = this.handleChange.bind(this); // O esto o fnc flecha
		
    }
	
	
    // BotonesHeader() {
    //     let nCesta = this.props.cart ? Object.keys(this.props.cart).length : 0;
    //     let strNCesta = nCesta === 0 ? "" : `(${nCesta})`;

    //     const userType = session.get()?.userType;
        
    //     if (this.props.isLoggedIn && userType) {
    //         // si estoy logeado...
            
    //         switch (userType) {

    //             case 1:
    //                 //en el caso de que sea sólo comprador..
                    
    //                 return (
    //                     <Fragment>
    //                         <button>
    //                             <NavLink exact to="/profile">
    //                                 Perfil
    //                             </NavLink>
    //                         </button>
    //                         <button>
    //                             <NavLink exact to="/cart">
    //                                 Cesta {strNCesta}
    //                             </NavLink>
    //                         </button>
    //                         <button className="logoutButton" onClick={() => this.pulsaLogout()}>
    //                             Logout
    //                         </button>
    //                     </Fragment>
    //                 );

    //             case 2:
                    
    //                 return (
    //                     <Fragment>
    //                         <button>
    //                             <NavLink exact to="/profile">
    //                                 Perfil
    //                             </NavLink>
    //                         </button>
    //                         <button>
    //                             <NavLink exact to="/storage">
    //                                 Mi inventario
    //                             </NavLink>
    //                         </button>
    //                         <button>
    //                             <NavLink exact to="/cart">
    //                                 Cesta {strNCesta}
    //                             </NavLink>
    //                         </button>
    //                         <button className="logoutButton" onClick={() => this.pulsaLogout()}>
    //                             Logout
    //                         </button>
    //                     </Fragment>
    //                 );

    //             case 3:
    //                 return (
    //                     <Fragment>
    //                         <button>
    //                             <NavLink exact to="/admin">
    //                                 Admin
    //                             </NavLink>
    //                         </button>
    //                         <button>
    //                             <NavLink exact to="/profile">
    //                                 Perfil
    //                             </NavLink>
    //                         </button>
    //                         <button>
    //                             <NavLink exact to="/storage">
    //                                 Mi inventario
    //                             </NavLink>
    //                         </button>
    //                         <button>
    //                             <NavLink exact to="/cart">
    //                                 Cesta {strNCesta}
    //                             </NavLink>
    //                         </button>
    //                         <button className="logoutButton" onClick={() => this.pulsaLogout()}>
    //                             Logout
    //                         </button>
    //                     </Fragment>
    //                 );

    //             default:
    //                 console.log( "USERTYPE ERROR - not buyer, not seller, not admin" );
                
    //         }
    //     } else {
    //         //visito la página de forma anónima..
    //         return (
    //             <Fragment>
    //                 <button>
    //                     <NavLink exact to="/login">
    //                         Acceder
    //                     </NavLink>
    //                 </button>
    //                 <button>
    //                     <NavLink exact to="/register">
    //                         Registrarse
    //                     </NavLink>
    //                 </button>
    //                 <button>
    //                     <NavLink exact to="/cart">
    //                         Cesta {strNCesta}
    //                     </NavLink>
    //                 </button>
    //             </Fragment>
    //         );
    //     }
	// }
	
	
	
    // pulsaLogout() {
    //     let token = session.get().token;
		
    //     // Hago la llamada para borrar mi token
    //     axios.get(getUrl(`/user/logout?token=${token}`));
		
    //     // Borro mis datos de sesión
    //     session.del();

    //     // Digo que no estoy logeado (con redux)
    //     login(false);

    //     // Redirección
    //     this.props.history.push("/");
	// }
	
	
	
	handleChange = (ev, stateKey) => {
		this.setState({ [stateKey]: ev.target.value });
	};
	
	
	
    render() {
        return (
            <header>
				
				<div className="logo">
                    <NavLink to="/">
                        {/* <img src="/img/logo.png" alt="logo" /> */}
                        <img src="https://trello-attachments.s3.amazonaws.com/5e1f276fc18d582b4781c087/5e1f2e19295ba37cfa41ebe6/d070adb352870f4da9f32d1f43ceee01/labor.png" alt="logo" />
                    </NavLink>
                </div>
				
				
				<div className="centro">
					<Input addonAfter={<Icon type="search" />} defaultValue="" placeholder="Búsqueda" />
				</div>
				
				
				<div className="fin">
					<Button type="primary" shape="circle" icon="user" size="large" />	
				</div>
				
            </header>
        );
    }
}



const mapStateToProps = state => {
    return {
        
    };
};

export default connect(mapStateToProps)(withRouter(Header));

// withRouter(Header) es para meter Header en el contexto de "Route" para que tenga el history y toa la movida
