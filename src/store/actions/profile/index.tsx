import AxiosCall from '../../../Utils/axios';
import ErrorHandler from '../../../Utils/error-handler';

export const profileStart = () => ({
  type: "UPDATE_START",
});

// updates teh state on success
export const profileSuccess = (payload: any) => ({
  type: "UPDATE_SUCCESS",
  payload,
});

// updates teh state if the request fails
export const profileFail = (payload: any) => ({
  type: "UPDATE_FAIL",
  payload,
});

// cleans up the state after making request
export const profileCleanup = () => ({
  type: "UPDATE_CLEANUP",
});

/**
 * @const update_profile
 * @param payload the request payload
 * @returns the uopdated user data
 */
export const update_profile = (payload: any) => async (dispatch: any) => {
  try {
    //  this action fires when the request start
    dispatch(profileStart());
     /**
     * @const requestObj
     * @description contains the request parameters
     */
    const requestObj = {
      path: 'user', // the request path
      method: 'PUT', // the request method
      data: payload, // the request data / payload
    };
    const { data } = await AxiosCall(requestObj); // return the data from the call
    dispatch(profileSuccess(data));// updates the state if the reponse status is 200
  } catch (err) { // if error, catch the error and return it to the user
    const error = ErrorHandler(err); // handles the undefined errors e.g netwoork issues
    dispatch(profileFail(error)); // updates the state if the request fails
  }
};
