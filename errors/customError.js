const generateError = (statusCode = 500, message = "Something went wrong.") => {
  const error = new Error(message);
  error.status = statusCode;

  return error;
};

module.exports = generateError;
