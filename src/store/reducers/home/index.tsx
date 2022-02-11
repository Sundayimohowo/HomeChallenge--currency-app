import { fetchUser as initialState } from "../../initialStates";

const fetchuser = (state = initialState, action: any) => {
  switch (action.type) {
    case "USER_START":
      return {
        ...state,
        isLoading: true,
      };
    case "USER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "USER_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "USER_CLEANUP":
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

export default fetchuser;
