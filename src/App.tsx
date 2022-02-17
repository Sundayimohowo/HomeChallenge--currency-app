import './App.css';
import AppNavContainer from './navigations';
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import store from './store'
function App() {
  return (
    <Provider store={store}>
      <AppNavContainer />
    </Provider>
  );
}

export default App;
