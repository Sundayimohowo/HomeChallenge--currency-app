import { combineReducers } from "redux";

//reducers
import login from './login'
import signup from './signup'
import auth from './auth'
import profile from './profile'
import exchange from "./currencies";
import fetchuser from "./home";
import fetchAllCurrency from "./fetchCurrencies";
import currencyRate from "./currencyRate"

/**
 * @function rootReducer 
 * @description It combines all  the reducers and share within nested components
 */
const rootReducer = combineReducers({
    login,
    signup,
    auth,
    profile,
    exchange,
    fetchuser,
    fetchAllCurrency,
    currencyRate
})

export default rootReducer