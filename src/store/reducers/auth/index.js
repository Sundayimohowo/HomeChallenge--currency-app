import { auth as initialState } from "../../initialStates";
 
// the  auth reducers. handles all authentication state
const auth = (state = initialState, { type, payload }) => {
    // switch the action type
    switch (type) {
        case "SET_AUTH":
            console.log(payload)
            return {
                ...state,
                isLoggedIn: payload.isLoggedIn, // updates the islogged in state
                token: payload.token, // updates the token
                user: payload.user // sets the user details
            }
        case "CLEAR_AUTH":
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                user: null
            }
        default:
            return state
    }
}
//export the component to be available to other components
export default auth