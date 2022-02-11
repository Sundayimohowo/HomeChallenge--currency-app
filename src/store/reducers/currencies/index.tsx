import { exchange as initialState } from "../../initialStates";

const exchange = (state = initialState, action: any) => {
  switch (action.type) {
    case "CURRENCY_START":
      return {
        ...state,
        isLoading: true,
      };
    case "CURRENCY_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "CURRENCY_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "CURRENCY_CLEANUP":
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

export default exchange;
