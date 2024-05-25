const { Admin } = require("../schema");

async function adminMiddleware(req, res, next) {
  let username = req.heards.username;
  let password = req.heards.password;

  if (!username || !password) {
    return res.json({ message: "Invalid Input" });
  }

  let admin = await Admin.findOne({ username: username, password: password });

  if (!admin) {
    return res.json({ message: "Admin Not Found" });
  }

  req.admin = admin;

  next();
}

module.exports = adminMiddleware;
