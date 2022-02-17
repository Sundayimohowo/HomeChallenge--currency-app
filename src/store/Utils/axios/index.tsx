import Axios from 'axios';

const REACT_APP_SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
let baseURL: string;
if (REACT_APP_SERVER_HOST) {
  baseURL = `${REACT_APP_SERVER_HOST}/`;
} else {
  const host = 'https://homechallenge.volopa.com';
  baseURL = `${host}/`;
}

const AxiosCall = async (requestObj: { path: any; method: any; data: any; contentType?: any; version?: any; }) => {
  const { path, method, data, contentType, version = '' } = requestObj;
  /**
   * Basic authorization token generated when user logs in and stored in the local storage
   */
  const token = localStorage.getItem('authToken');

  /**
   * The request header
   */
  const headers = {
    Authorization: `Bearer ` + token, // the authorization token
    'Content-Type': contentType || 'application/json',
  };

  const url = version ? `${baseURL}${version}/${path}` : `${baseURL}${path}`;
  try {
    /***
     * make request to the specified endpoint and return data back to the user
     */
    const response: any = await Axios({ method, url, data, headers, });

    /***
     * store the return data in result variable
     */
    const result = response && response.data;
    return result; // return result to the user
  } catch (error) {
    /**
     * if an error occur, catch the error and treat the error
     */
    const { response }: any = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    if (errorObject.status === 401) {
      setTimeout(()=>{
        /**
       * if the token has expires, refresh the token and generate a new access token
       */
         Axios({
          url: 'https://homechallenge.volopa.com/auth/getToken', //token endpoint
          method: 'post',
          params: {
            "grant_type": "refresh_token",
            "clientId": localStorage.getItem("authUser"),
            "refresh_token": localStorage.getItem('refreshToken')
          },
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).then(
          (response) => {
            /**
        * store the new genrated token in the storage
        */
            localStorage.setItem("authToken", response.data.access_token)
            localStorage.setItem("refreshToken", response.data.refresh_token)
            window.location.reload()
          }
        );
      },1000)
     
    }
    return response
  }
};

export default AxiosCall; // export the component
