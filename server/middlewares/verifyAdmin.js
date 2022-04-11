const verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "You don't have required Permission!" });
  }
  next();
};

module.exports = verifyAdmin;
