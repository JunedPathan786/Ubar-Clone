const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log("🔐 Received Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const isBlacklisted = await BlacklistedToken.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Token is blacklisted." });
  }

  try {
    console.log("🔑 JWT_SECRET from env:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Decoded:", decoded);

    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("❌ Token verification error:", error.message);
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const isBlacklisted = await BlacklistedToken.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Token is blacklisted." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);

    if (!captain) {
      return res.status(401).json({ message: "Invalid token." });
    }

    req.captain = captain;
    next();
  } catch (error) {
    console.log("❌ Token verification error:", error.message);
    return res.status(401).json({ message: "Invalid token." });
  }
};


module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const isBlacklisted = await BlacklistedToken.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "Token is blacklisted." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;

    return next();
  } catch (error) {
    console.log(err);
    res.status(401).json({ message: "Invalid token." });
  }
};
