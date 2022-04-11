const verifyPermission = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "You don't have required Permission!" });
  }
};

module.exports = verifyPermission;
