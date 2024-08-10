class AuthError extends Error {
  status = 404;
  constructor(message = "Token not provided") {
    super(message);
  }
}

module.exports = AuthError;
