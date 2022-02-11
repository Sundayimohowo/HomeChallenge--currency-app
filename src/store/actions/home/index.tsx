import AxiosCall from '../../../Utils/axios';
import ErrorHandler from '../../../Utils/error-handler';

export const fetchUserStart = () => ({
  type: "USER_START",
});

// fires when the request is succesfull made and data has been returned
export const fetchUserSuccess = (payload: any) => ({
  type: "USER_SUCCESS",
  payload,
});

// updates the state if the request fails
export const fetchUserFail = (payload: any) => ({
  type: "USER_FAIL",
  payload,
});

// cleans  up the state after each request
export const fetchUserCleanup = () => ({
  type: "USER_CLEANUP",
});

/**
 * @const fetchUser
 * @description the  Logged in user details
 */
export const fetchUser = () => async (dispatch: any) => {
  
  try {
    // event fires when the request start
    dispatch(fetchUserStart());
     /**
     * @const requestObj
     * @description contains the request parameters
     */
    const requestObj = {
      path: 'user', // the request path
      method: 'GET', // the request method
      data: "", // the request data / payload
    };
    // the data returned from the request
    const { data } = await AxiosCall(requestObj);
    // fires when the request is successfull
    dispatch(fetchUserSuccess(data));
  } catch (err) { // if error, catch the error and displays it to the user
    const error = ErrorHandler(err); // handles undefined errors e.g errors from poor connection
    dispatch(fetchUserFail(error)); // updates the state mif the request failed
  }
};
