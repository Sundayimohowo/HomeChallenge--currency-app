import { profile as initialState } from "../../initialStates";

const profile = (state = initialState, action: any) => {
  switch (action.type) {
    case "UPDATE_START":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "UPDATE_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "UPDATE_CLEANUP":
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

export default profile;
