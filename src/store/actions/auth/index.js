export const setAuth = () => {
    const token = localStorage.getItem('authToken')
    const user = localStorage.getItem('authUser')
    // sets the login value to to true if the token is valid
    if (token) {
        return {
            type: "SET_AUTH",
            payload: {
                token, // the token  
                user: JSON.parse(user), // the user data
                isLoggedIn: true // login state
            }
        }
    }
    return {
        type: "CLEAR_AUTH"
    }
}

// clears the login state
export const clearAuth = () => ({
    type: "CLEAR_AUTH"
})