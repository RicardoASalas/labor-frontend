import React from 'react';
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


const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	link: {
		textDecoration: "none",
		color: "black",
		cursor: "pointer"
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
				props.session.username ? props.history.push("/profile") : props.history.push("/login");
			break;
			
			default: break;
		}
		
	};
	
	
	
	return (
		
		<Paper className={classes.root}>
			
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
				
				{ props.session.username ? 
					
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
	);
}



const mapStateToProps = (state) => {
	return ({
		session: state.session,
		
	})
};


export default connect(mapStateToProps) (withRouter(CenteredTabs));
