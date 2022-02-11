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

export const currencyRate = (payload: any) => async (dispatch: any) => {
  try {
    dispatch(currencyRateStart());
    const requestObj = {
      path: 'currencies/rate',
      method: 'GET',
      data: payload,
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(currencyRateSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(currencyRateFail(error));
  }
};
