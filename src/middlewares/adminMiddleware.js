const { JWT_SECRET } = require("../config/serverConfig");
const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
  const words = req.headers.authorization;
  if (!words) {
    return res.json({ message: "Your Are Not Authenticated" });
  }

  const token = words.split(" ")[1];
  if (!token) {
    return res.json({ message: "Your Are Not Authenticated" });
  }

  const decodedValue = jwt.verify(token, JWT_SECRET);

  if (decodedValue.username && decodedValue.type === "admin") {
    req.username = decodedValue.username;
    next();
  } else {
    return res.json({ message: "Your Are Not Authenticated" });
  }
}

module.exports = adminMiddleware;
