import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const signupStart = () => ({
  type: "SIGNUP_START",
});

// updates the sgtate when the signup is succesfull
export const signupSuccess = (payload: any) => ({
  type: "SIGNUP_SUCCESS",
  payload,
});

// if the signup fail, updates the state
export const signupFail = (payload: any) => ({
  type: "SIGNUP_FAIL",
  payload,
});

// cleans up the state
export const signupCleanup = () => ({
  type: "SIGNUP_CLEANUP",
});

/**
 * @const signup the signup action 
 * @param payload the data to sent to the request i.e request data
 * @returns the signed up user data
 */
export const signup = (payload: any) => async (dispatch: any) => {
  try {
    dispatch(signupStart());
     /**
     * @const requestObj
     * @description contains the request parameters
     */
    const requestObj = {
      path: "user", // request path
      method: "POST", // request method
      data: payload, // request data
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(signupSuccess(data)); // fires if the signup is succesfull
  } catch (err) {
    const error = ErrorHandler(err); // handle the undefined errors e.g fro network issues
    dispatch(signupFail(error)); // update the state
  }
};
