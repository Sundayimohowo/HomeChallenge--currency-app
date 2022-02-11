
import AxiosCall from '../../../Utils/axios';
import ErrorHandler from '../../../Utils/error-handler';

export const allCurrencyStart = () => ({
  type: "FETCHALL_CURRENCY_START", // action type
});

// updates the state if the request is succesfull
export const allCurrencySuccess = (payload: any) => ({
  type: "FETCHALL_CURRENCY_SUCCESS", // action type
  payload, // action payload
});

// updates the state if the request failed
export const allCurrencyFail = (payload: any) => ({
  type: "FETCHALL_CURRENCY_FAIL", // action type
  payload, // action payload
});

// cleans up the state after each request
export const allCurrencyCleanup = () => ({
  type: "FETCHALL_CURRENCY_CLEANUP", // action type
});

/**
 * @const allCurrency 
 * @description fetch all the available currency for exchange
 * @returns retuens the available currency
 */
export const allCurrency = () => async (dispatch: any) => {
  try {
    dispatch(allCurrencyStart()); // fires when the request begin
     /**
     * @const requestObj
     * @description contains the request parameters
     */
    const requestObj = {
      path: 'currencies', // the request path
      method: 'GET',  // the request method
      data: "", // the data sent to the request
    };
    const { data } = await AxiosCall(requestObj); // the data request from the request
    dispatch(allCurrencySuccess(data)) // updates the state when the request is successfully made
  } catch (err) { // if error, catchb the error and throe the error to the user
    const error = ErrorHandler(err); // handles the unknown errors e.g errors from poor connection
    dispatch(allCurrencyFail(error)); // cleans up the state if the request fail
  }
};
