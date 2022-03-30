interface ErrorObj {
  errors: {
    message: string[];
    stack?: any;
  };
}

// ensure that the constant NODE_ENV will always be a string, since it will
// be extremely difficult to error check the errorWrapper function
const NODE_ENV = process.env.NODE_ENV === undefined ? '' : process.env.NODE_ENV;

/**
 * Returns a JSON wrapped error
 *
 * @remarks
 * This method configures the JSON object to include the stack strace if the application is in development mode
 *
 * @param error - a thrown error
 * @param message - message specified by caller
 * @returns A javascript object
 */
const errorWrapper = (error: any, message: string): ErrorObj => {
  const errorInfo: ErrorObj = {
    errors: {
      message: [message, error.message],
    },
  };

  if (NODE_ENV === 'development') errorInfo.errors.stack = error.stack;

  return errorInfo;
};

export { errorWrapper };
