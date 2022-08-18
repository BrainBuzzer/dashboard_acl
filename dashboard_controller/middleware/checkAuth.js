const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const checkAuthentication = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(401).json({
      message: "Access denied. No token provided.",
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "Access denied. Invalid token.",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

module.exports = checkAuthentication;
