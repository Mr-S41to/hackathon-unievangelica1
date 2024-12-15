const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function AuthenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (error, user) => {
    if (error) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

module.exports = { AuthenticateToken };
