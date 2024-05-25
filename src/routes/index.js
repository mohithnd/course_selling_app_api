const express = require("express");
const userRouter = require("./userRouter");
const adminRouter = require("./adminRouter");

const apiRouter = express.Router();

apiRouter.use("/users", userRouter);

apiRouter.use("/admin", adminRouter);

module.exports = apiRouter;
