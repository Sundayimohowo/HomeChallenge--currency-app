import AxiosCall from '../../../Utils/axios';
import ErrorHandler from '../../../Utils/error-handler';

export const currencyRateStart = () => ({
  type: "CURRENCY_START",
});

export const currencyRateSuccess = (payload: any) => ({
  type: "CURRENCY_SUCCESS",
  payload,
});

export const currencyRateFail = (payload: any) => ({
  type: "CURRENCY_FAIL",
  payload,
});

export const currencyRateCleanup = () => ({
  type: "CURRENCY_CLEANUP",
});

/**
 * @const currencyRate
 * @param payload the passed data
 * @returns the currency rate for two pair of currency
 */
export const currencyRate = (payload: any) => async (dispatch: any) => {
  try {
    dispatch(currencyRateStart());
     /**
     * @const requestObj
     * @description contains the request parameters
     */
    const requestObj = {
      path: `currencies/rate?buyCcy=${payload.buyCcy}&sellCcy=${payload.sellCcy}`,
      method: 'GET',
      data: "",
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(currencyRateSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(currencyRateFail(error));
  }
};
