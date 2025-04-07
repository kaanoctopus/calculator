const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: "Too many requests from this IP, please try again later"
});

exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many login attempts from this IP, please try again later",
  skipSuccessfulRequests: true
});

exports.passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: "Too many password reset attempts from this IP, please try again later"
});

exports.securityHeaders = helmet();

exports.sanitizeInput = (req, res, next) => {
  for (const key in req.body) {
    if (typeof req.body[key] === 'string') {
      req.body[key] = req.body[key].trim();
    }
  }
  next();
};