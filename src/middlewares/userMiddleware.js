const { User } = require("../schema");

async function userMiddleware(req, res, next) {
  let username = req.heards.username;
  let password = req.heards.password;

  if (!username || !password) {
    return res.json({ message: "Invalid Input" });
  }

  let user = await User.findOne({ username: username, password: password });

  if (!user) {
    return res.json({ message: "User Not Found" });
  }

  req.user = user;

  next();
}

module.exports = userMiddleware;
