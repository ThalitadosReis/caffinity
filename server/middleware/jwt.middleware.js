const { expressjwt: jwt } = require("express-jwt");

// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

// Middleware to check if user is authenticated AND is an admin
const isAuthenticatedAndAdmin = (req, res, next) => {
  isAuthenticated(req, res, () => {
    // Check if user is an admin
    if (req.payload.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json({ error: "You are not authorized to access this resource" });
    }
  });
};

// Middleware to check if user is authenticated or is an admin
const isAuthenticatedOrAdmin = (req, res, next) => {
  isAuthenticated(req, res, () => {
    if (req.payload.isAdmin || req.payload.userId === req.params.id) {
      next();
    } else {
      res
        .status(403)
        .json({ error: "You are not authorized to access this resource" });
    }
  });
};

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}

// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
  isAuthenticatedAndAdmin,
  isAuthenticatedOrAdmin,
};
