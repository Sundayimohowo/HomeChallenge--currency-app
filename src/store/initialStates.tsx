const token = localStorage.getItem('tokenUser')
const user = localStorage.getItem('authUser')

// login state
export const login = {
    isLoading: false,
    isSuccessful: false,
    data: null,
    error: null,
};

// profile details state
export const profile = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

// user state
export const users = {
    isLoading: false,
    isSuccessful: false,
    data: null,
    error: null,
};

// state to fetch all currencies
export const fetchcurrencies = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const rate = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const fetchUser = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const signup = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null
}

export const exchange = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null
}

export const auth = {
  token: token || null,
  user: user || null,
  isLoggedIn: token ? true : false,
}