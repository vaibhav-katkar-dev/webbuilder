const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User, Site, Template } = require('../models');

router.get(['/', '/profile'], async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    const templates = await Template.find({});
      const sites = await Site.find({ userId: user._id });


    res.render('profile', {
      user: { ...user.toObject(), sessionId: req.sessionID },
      templates,
      sites
    });
  } catch (err) {
    console.error("Profile route error:", err);
    res.redirect('/login');
  }
});

module.exports = router;
