const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const authorization = req.get("Authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication is required" });
  }

  try {
    const token = authorization.slice("Bearer ".length);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = String(payload.userId);
    return next();
  } catch {
    return res.status(401).json({ message: "Your session is invalid or expired" });
  }
}

function requireMatchingUser(req, res, next) {
  if (String(req.params.userId) !== req.userId) {
    return res.status(403).json({ message: "You cannot access another user's profile" });
  }

  return next();
}

module.exports = { requireAuth, requireMatchingUser };
