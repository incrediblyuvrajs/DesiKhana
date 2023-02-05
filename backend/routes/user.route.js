const express = require("express");
const userRouter = express.Router();
const { postUser } = require("../controllers/user.controller");

userRouter.route("/").post(postUser);

module.exports = userRouter;
