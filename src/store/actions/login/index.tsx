import axios from 'axios';
import AxiosCall from '../../../Utils/axios';
import ErrorHandler from '../../../Utils/error-handler';
import { setAuth } from '../auth';

export const loginStart = () => ({
  type: "LOGIN_START",
});

// updates the initial state if the login is successful
export const loginSuccess = (payload: any) => ({
  type: "LOGIN_SUCCESS",
  payload,
});

// updates the state on login failure
export const loginFail = (payload: any) => ({
  type: "LOGIN_FAIL", // action type
  payload, // action payload
});

// cleans up the state
export const loginCleanup = () => ({
  type: "LOGIN_CLEANUP", // action type
});

export const login = (payload: any) => async (dispatch: any) => {
  try {
    dispatch(loginStart());
     /**
     * @const requestObj
     * @description contains the request parameters
     */
    const requestObj = {
      path: 'auth/getCredentials', // request url
      method: 'POST', // request method
      data: payload, // action payload
    };

    // the logged in user's data
    const { data } = await AxiosCall(requestObj);
    /**
     * Generate Access token for the logged in user and authenticated the user
     */
    const authentify: any = await axios({
      url: 'https://homechallenge.volopa.com/auth/getToken', // request url
      method: 'post', // request method
      params: {
        "grant_type": 'client_credentials',
        "scope_id": "2"
      },
      headers: { // request headers
        "Authorization": `Basic ${data.credentials.clientId}:${data.credentials.secret}`,
        'Accept':'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: data.credentials.clientId,
        password: data.credentials.secret
      }
    });
      localStorage.setItem('authToken', authentify.data.access_token); // the generated authtoken 
      localStorage.setItem('refreshToken', authentify.data.refresh_token); // the generated refresh token
      localStorage.setItem("authUser",data.credentials.clientId) // the clientId
      // updates the state after logging in user succesfully
    dispatch(loginSuccess(data));
    dispatch(setAuth())
  } catch (err) { // if error, catch the error and send to the user
    const error = ErrorHandler(err); // the catched error
    dispatch(loginFail(error)); // dispatched after login failed
  }
};
