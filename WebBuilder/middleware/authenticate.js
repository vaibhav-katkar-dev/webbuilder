// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async function authenticate(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.redirect('/login');

    req.user = user;
    next();
  } catch (err) {
    return res.redirect('/login');
  }
};
