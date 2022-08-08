const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  const accountToken = req.headers.authorization;
  if (!accountToken) {
    return res.status(401).json({
      message: "Access denile, please signin",
    });
  }
  // console.log(req.headers.authorization)
  const token = accountToken.replace("Bearer ", "");
  try {
    const decode = jwt.verify(token, process.env.ACCOUNT_SECRET_TOKEN);
    const id = decode.id;
    // check
    await User.findById(id)
      .then((result) => {
        // verify success
        req.user = result;
        next();
      })
      .catch((error) => {
        res.status(401).json(error);
        console.log("authorization error");
      });
  } catch (error) {
    console.log("invalid token");
    res.status(400).json({
      message: "wrong token",
      error: error,
    });
  }
};
