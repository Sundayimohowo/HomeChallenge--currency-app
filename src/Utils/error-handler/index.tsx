/**
 * @const function ErrorHandler
 * @param event 
 * @returns error from due to unknown issues e.g from poor network
 */
const ErrorHandler = (e: any) => {
    // declare the error variable
    let errorResponse;
    try {
      if (e.response.data === undefined) errorResponse = 'Something went wrong';
      const { message } = e.response.data;
      errorResponse = message
    } catch (e) {
      errorResponse = 'Something went wrong';
    }
    // Return the error value to the user
    return errorResponse;
  };
  
  export default ErrorHandler; // export the component to other components
  