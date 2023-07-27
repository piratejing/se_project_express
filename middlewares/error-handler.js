function errorHandler(err, req, res, next) {
  // Log the error for debugging purposes
  console.error(err);

  // Check if the error has a status code, otherwise, set it to 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;

  // Set the response status code and send the error message as JSON
  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
}

module.exports = errorHandler;
