const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

const protect = async (req, res, next) => {
  let token;
  let bearerToken = req.headers.authorization
  if (
    bearerToken &&
    bearerToken.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log('token', token)
  if (!token) {

    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  // const decoded = jwt.verify(token, "123456789");
  // console.log(decoded)
  try {

    const decoded = jwt.verify(token, "123456789");

    if (decoded.email !== "support@sellkon.com") {
      return next(new ErrorResponse("Admin email invalid", 404));
    } else if (decoded.password !== "sellkon@#2024COM") {
      return next(new ErrorResponse("Admin password incorrect", 404));
    }

    // req.user = user;

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this router", 401));
  }
};

//test git
module.exports = protect;

