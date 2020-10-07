import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

// Combining all reducers being used
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
});

// Checking the user's browser storage for cart items
const cartItemsFromStorage = localStorage.getItem("cartItems") 
    ? JSON.parse(localStorage.getItem("cartItems")) 
    : [];

// Checking the user's browser storage to see if they're logged in
const userInfoFromStorage = localStorage.getItem("userInfo") 
    ? JSON.parse(localStorage.getItem("userInfo")) 
    : null;

// Setting user's cart to whatever is found in browser's storage        
const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

// Initializing the store for Redux
const store = createStore(
    reducer,                                //  All reducers being used
    initialState,                           //  Initial state for a user accessing site 
    composeWithDevTools(                    //  Applying Thunk as middleware
        applyMiddleware(...middleware))
    );

export default store