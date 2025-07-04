const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async function redirectIfAuthenticated(req, res, next) {
  const token = req.cookies.token;
  if (!token) return next(); // User not logged in → continue to login page
console.log("TOKEN:", req.cookies.token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return next(); // Token invalid or user deleted → continue to login

    // If authenticated, redirect to profile
    return res.redirect('/profile');
  } catch (err) {
    return next(); // Token verification failed → continue to login
  }
};
