import AxiosCall from '../../../Utils/axios';
import ErrorHandler from '../../../Utils/error-handler';

export const exchangeStart = () => ({
  type: "CURRENCY_START",
});

// fires if the call is successfull
export const exchangeSuccess = (payload: any) => ({
  type: "CURRENCY_SUCCESS",
  payload,
});

// if the call fails
export const exchangeFail = (payload: any) => ({
  type: "CURRENCY_FAIL",
  payload,
});

// cleans the state after each call
export const exchangeCleanup = () => ({
  type: "CURRENCY_CLEANUP",
});

/**
 * @const exchange
 * @param payload the passed data
 * @returns the exchange action thatb fires when the user clicks 
 * on the exchange button with valid values
 */
export const exchange = (payload: any) => async (dispatch: any) => {
  try {
    dispatch(exchangeStart()); // when the call is fired
    
    /**
     * @const requestObj
     * @description contains the request parameters
     */
    const requestObj = {
      path: 'currencies/exchange', // request path
      method: 'POST', // the request method
      data: payload, 
    };

    // makes the call to the endpoint with the provided requestObj
    const { data } = await AxiosCall(requestObj);
    // change the state to success
    dispatch(exchangeSuccess(data));
  } catch (err) { // if error, then catch
    /**
     * @see component ErrorHandler
     */
    const error = ErrorHandler(err);
    // clears the state
    dispatch(exchangeFail(error));
  }
};
