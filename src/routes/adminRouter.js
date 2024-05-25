const express = require("express");
const { Admin, Course } = require("../schema");
const adminMiddleware = require("../middlewares/adminMiddleware");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");

const adminRouter = express.Router();

adminRouter.post("/signup", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    return res.json({ message: "Invalid Input" });
  }

  let admin = await Admin.findOne({ username });

  if (admin) {
    return res.json({ message: "Admin Already Present" });
  }

  admin = new Admin({ username, password });

  await admin.save();

  return res.json({ message: "Admin Created Successfully" });
});

adminRouter.post("/signin", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    return res.json({ message: "Invalid Input" });
  }

  let admin = await Admin.findOne({ username, password });

  if (!admin) {
    return res.json({ message: "Admin Not Found" });
  }

  const token = jwt.sign(
    {
      username,
      type: "admin",
    },
    JWT_SECRET
  );

  return res.json({ token });
});

adminRouter.post("/courses", adminMiddleware, async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let imageLink = req.body.imageLink;
  let price = req.body.price;

  if (!title || !description || !imageLink || !price) {
    return res.json({ message: "Invalid Input" });
  }

  let course = await Course.findOne({ title: title });

  if (course) {
    return res.json({ message: "Course Already Present" });
  }

  course = new Course({ title, description, imageLink, price });

  await course.save();

  return res.json({ message: "Course Created Successfully" });
});

adminRouter.get("/courses", adminMiddleware, async (req, res) => {
  let courses = await Course.find({});

  return res.json({ courses: courses });
});

module.exports = adminRouter;
