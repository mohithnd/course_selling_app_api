const express = require("express");
const { User, Course } = require("../schema");
const userMiddleware = require("../middlewares/userMiddleware");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    return res.json({ message: "Invalid Input" });
  }

  let user = await User.findOne({ username: username });

  if (user) {
    return res.json({ message: "User Already Present" });
  }

  user = new User({
    username: username,
    password: password,
  });

  await user.save();

  return res.json({ message: "User Created Successfully" });
});

userRouter.get("/courses", userMiddleware, async (req, res) => {
  const courses = await Course.find({});

  return res.json({ courses: courses });
});

userRouter.post("/courses/:courseId", userMiddleware, async (req, res) => {
  let courseId = req.params.courseId;

  if (!courseId) {
    return res.json({ message: "Invalid Input" });
  }

  let course = await Course.findById(courseId);

  if (!course) {
    return res.json({ message: "Course Not Found" });
  }

  let user = req.user;

  for (let i = 0; i < user.purchasedCourses.length; i++) {
    if (user.purchasedCourses[i] == courseId) {
      return res.json({ message: "Course Already Bought" });
    }
  }

  user.purchasedCourses.push(courseId);

  await user.save();

  return res.json({ message: "Course Purchased Successfully" });
});

userRouter.get("/purchasedCourses", userMiddleware, async (req, res) => {
  let user = req.user;

  return res.json({ purchasedCourses: user.purchasedCourses });
});

module.exports = userRouter;
