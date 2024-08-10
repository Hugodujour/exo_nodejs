const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const AuthError = require("../errors/auth-error");

module.exports = (req, res, next) => {
  try {
    const UserToken = req.headers["x-access-token"];
    if (!UserToken) {
      throw new AuthError();
    }
    const decoded = jwt.verify(UserToken, config.secretJwtToken);
    req.user = decoded;
    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
