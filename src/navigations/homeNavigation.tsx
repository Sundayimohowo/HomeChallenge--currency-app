import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EXCHANGE, HOME, LOGIN, PROFILE, REGISTER } from "../constants/routes";
import ExchangeInputWrapper from "../screens/exchange";
import LoginComponent from "../screens/login";
import ProfileComponent from "../screens/profile";
import RegisterComponent from "../screens/register";

/**
 * @const HomeNavigator 
 * @description Routes for when user is logged in
 */
const HomeNavigator = () => {
    return (
        <Router>
            <Routes>
                <Route path={REGISTER} element={<RegisterComponent />} />
                <Route path={HOME} element={<LoginComponent />} />
            </Routes>
        </Router>
    );
};

export default HomeNavigator;//  export the component 
