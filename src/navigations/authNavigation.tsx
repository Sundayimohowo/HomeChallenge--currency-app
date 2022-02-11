import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EXCHANGE, HOME, PROFILE } from "../constants/routes";
import ExchangeInputWrapper from "../screens/exchange";
import HomeWrapper from "../screens/home";
import ProfileComponent from "../screens/profile";

/**
 * @const HomeNavigator 
 * @description Routes for when user is not logged in
 */
const HomeNavigator = () => {
    return (
        <Router>
            <Routes>
                <Route path={PROFILE} element={<ProfileComponent />} /> {/**profile route */}
                <Route path={EXCHANGE} element={<ExchangeInputWrapper />} /> {/**the exchange page route */}
                <Route path={HOME} element={<HomeWrapper />} /> {/**Home route */}
            </Routes>
        </Router>
    );
};

export default HomeNavigator; //  export the component 
