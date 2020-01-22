
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// CSS
import "./global.css";
import "./App.css";

// Componentes
import Home from "./containers/home/home";
import Header from "./components/header/header";
import Login from "./containers/login/login";
import Profile from "./containers/profile/profile";
import Register from "./containers/register/register";
import Search from "./containers/search/search";


export default function App() {
	return (
		<div className="appClass">
			<Router>
				
				<Header/>
				
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={Register} />
					<Route path="/search" exact component={Search} />
					<Route path="/profile" exact component={Profile} />
					
				</Switch>
				
			</Router>
		</div>
	);
}



