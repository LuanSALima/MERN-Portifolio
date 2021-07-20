const handleError = (error) => {
  let message = error.message;
  let errors = {};

  if (error.name === "CastError") {
    /*

      Validado errado!!!

      console.log(error);

    */
    if(error.kind === "ObjectId") {
      message = "Não foi possível encontrar este usuário em nosso banco de dados";
    }
  }

  if (error.name === "ValidationError") {
    message = undefined;

    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
  }

  if (error.name === "MongoError" && error.code === 11000) {
    message = undefined;

    errors[Object.keys(error.keyValue)] = Object.keys(error.keyValue)+" já cadastrado";
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