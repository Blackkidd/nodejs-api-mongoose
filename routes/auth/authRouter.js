const { signup, signin } = require('../../controllers/authController/authController');
const authRouter = require('express').Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin); 
// signUpRoute.post("/")

module.exports = authRouter;
