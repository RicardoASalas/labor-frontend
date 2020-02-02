import store from "../store"


export const login = (loginData) => {
    store.dispatch({
		type: 'LOGIN',
		payload: loginData
	})
};

