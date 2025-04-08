const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again later"
});

const calcLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30, 
  message: "Too many calculation requests, please slow down"
});

module.exports = {
  authLimiter,
  calcLimiter
};
