import React, { Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Face from '@material-ui/icons/Face';

import { connect } from 'react-redux';
import ImageLabor from "../image/image";
import "./header.scss";


const useStyles = makeStyles({
	
	root: {
		flexGrow: 1,
	},
	
	link: {
		textDecoration: "none",
		color: "black",
		cursor: "pointer"
	},
	
	logoCorporativo: {
		position: "absolute"
	}
	
});



const CenteredTabs = (props) => {
	
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	
	
	const handleChange = (event, newValue) => {
		
		setValue(newValue);
		
		
		switch (newValue) {
			case 0: 
				props.history.push("/");
			break;
			case 1: 
				props.history.push("/search");
			break;
			case 2: 
				props.session?.username ? props.history.push("/profile") : props.history.push("/login");
			break;
			
			default: break;
		}
		
	};
	
	
	
	return (
		
		<Fragment className="mainHeader">
			
			<Paper className={classes.root}>
				
				<div className={classes.logoCorporativo}>
					<ImageLabor
						className=""
						src="https://trello-attachments.s3.amazonaws.com/5e1f2e19295ba37cfa41ebe6/1000x1000/93d5c1c8cceb6c32b1d9b50a01380268/labor_logo5.png"
						w={70}
						alt="imagen de la empresa"
						measure="px"
						br={15}
					/>
				</div>
				
				
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					centered
				>
					
					<Tab
						label="Home"
						icon={<HomeIcon />}
					/>
					
					<Tab
						label="Ofertas"
						icon={<WorkIcon />}
					/>
					
					{ props.session?.username ? 
						
						<Tab
							label="Perfil"
							icon={<Face />}
						/>
						
						:
						
						<Tab
							label="Acceder"
							icon={<AccountCircle />}
						/>
						
					}
					
					
					
				</Tabs>
				
			</Paper>
			
		</Fragment>
		
	);
}



const mapStateToProps = (state) => {
	return ({
		session: state.session,
		
	})
};


export default connect(mapStateToProps) (withRouter(CenteredTabs));
