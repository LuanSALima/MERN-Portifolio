const handleError = (error, request) => {
  let message = error.message;
  let errors = {};

  if (error.name === "CastError") {
    /*

      Validado errado!!!

      console.log(error);

    */
    if(error.kind === "ObjectId") {
      message = request.t('error_usernotfound');
    }
  }

  if (error.name === "ValidationError") {
    message = undefined;

    Object.keys(error.errors).forEach((key) => {
      errors[key] = request.t(error.errors[key].message);
    });
  }

  if (error.name === "MongoError" && error.code === 11000) {
    message = undefined;

    errors[Object.keys(error.keyValue)] = Object.keys(error.keyValue)+request.t('error_alreadyregistered');
  }

  if (error.name === "Error") {
    errors = undefined;

    message = error.message;
  }

  return {
    success: false,
    message,
    errors
  };
};

module.exports = handleError;