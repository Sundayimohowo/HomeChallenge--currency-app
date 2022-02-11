import { fetchcurrencies as initialState } from "../../initialStates";

const fetchAllCurrency = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCHALL_CURRENCY_START":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCHALL_CURRENCY_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "FETCHALL_CURRENCY_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "FETCHALL_CURRENCY_CLEANUP":
      return {
        ...state,
        isLoading: false,
        isSuccessful: false,
        error: null,
      };
    default:
      return state;
  }
};

export default fetchAllCurrency;
