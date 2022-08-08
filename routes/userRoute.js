const userRoute = require('express').Router();
const { getAllUser, updateUser } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');

userRoute.get("/all", authMiddleware, getAllUser);
userRoute.put("/:userId", authMiddleware, updateUser);
// userRoute.delete("/:userId", authMiddleware, deleteUser);

module.exports = userRoute;