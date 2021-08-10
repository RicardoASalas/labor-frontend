import { session } from "../../utils/uti";

const reducer = (state = {
	
	isLoggedIn: !!session.get(),
	searchPreFilters: {}
	
}, action) => {
	
	switch (action.type) {
		
		case "LOGIN":
			
			state.session = action.payload;
			
			return {
				...state,
				session: action.payload
			};
		
		case "LOGOUT":
			
			// state.session = {action.payload};
			
			return {};
		
		
		case "OFFER_DETAIL":
			return {
				...state,
				offerData: action.payload
			};
			
			
		case "SEARCH_PREFILTERS":
			return {
				...state,
				searchPreFilters: action.payload
			};
			
		case "SEARCH_PREFILTERS_DELETE":
			
			let newObj = {... state.searchPreFilters};
			delete newObj[action.payload];
			
			
			return {
				...state,
				searchPreFilters: newObj
			};
			
			
			
		
		// --------------------------------------------------------------------
		
		case "PRODUCT_DETAIL":
			return {
				...state,
				productData: action.payload
			};

		case "PRODUCT_SEARCH":
			return {
				...state,
				productSearchResults: action.payload
			};

		case "CART_TOTAL_PRICE":
			return {
				...state,
				totalPrice: action.payload
			};

		case "CART_ADD":
			return {
				...state,
				cart: [...state.cart, action.payload]
			};

		case "CART_EDIT":
			let newCart = state.cart.map(_x => {
				if (_x._id === action.payload._id) {
					// si ya existe
					_x.cartQuantity = action.payload.newQuantity; // lo modifico
				}

				return _x;
			});

			return {
				...state,
				cart: newCart
			};

		case "CART_REMOVE":
			let newChart = state.cart.filter((_x, index, arr) => {
				return _x._id !== action.payload;
			});

			return {
				...state,
				cart: newChart
			};

		default:
			return state;
		
			
	}
};

export default reducer;
