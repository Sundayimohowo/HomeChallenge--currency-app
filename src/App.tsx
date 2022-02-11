import './App.css';
import AppNavContainer from './navigations';
import { Provider } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store'
import { useEffect, useState } from 'react';
function App() {
  return (
    <Provider store={store}>
      <AppNavContainer />
    </Provider>
  );
}

export default App;
