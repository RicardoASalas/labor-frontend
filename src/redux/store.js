
/*
import {createStore} from 'redux';
import reducer from './reducers';

const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
*/


import { applyMiddleware, createStore } from "redux";
import reducer from "./reducers";
import { save, load } from "redux-localstorage-simple";
// import { session } from "../utils/uti";



const createStoreWithMiddleware = applyMiddleware(
	save({ states: ["session", "offerData"] })
)(createStore);

const store = createStoreWithMiddleware(
	reducer,
	load({
		preloadedState:{
			
			session: {}
			
		},
		states: ["session", "offerData"]
	}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

