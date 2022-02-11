
import AuthNavigator from "./authNavigation";
import HomeNavigator from "./homeNavigation";
const AppNavContainer = () => {
  const user = localStorage.getItem('authToken');
   return !user ? <HomeNavigator />:<AuthNavigator />
};

export default AppNavContainer;
