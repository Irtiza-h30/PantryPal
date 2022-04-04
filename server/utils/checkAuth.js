const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
require("dotenv").config();

const checkAuth = (authHeader) => {
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError(err);
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Invalid - Token Signature has failed.");
};

module.exports = checkAuth;
