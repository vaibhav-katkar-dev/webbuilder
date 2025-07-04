const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const redirectIfAuthenticated = require('../middleware/redirectIfAuthenticated');

const { body, validationResult } = require('express-validator');

// Route to serve signup page
router.get('/signup', redirectIfAuthenticated,(req, res) => {
  res.render('signup');
});
router.get('/login', redirectIfAuthenticated, (req, res) => {
  
  return res.render('login',{ error: null });
  
});

// Signup route
router.post('/signup',
  [
    body('username').isLength({ min: 3 }).trim().escape(),
    body('email').isEmail().normalizeEmail({ gmail_remove_dots: false }),
    body('password').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      let { username, email, password } = req.body;

      // 🔥 Remove all spaces from username
      username = username.replace(/\s/g, '');

      let user = await User.findOne({ email }).lean();
      if (user) return res.status(400).json({ message: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 12);
      user = new User({ username, email, password: hashedPassword });
      await user.save();

      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);


// Login route
router.post('/login',
  [
    body('email').isEmail().normalizeEmail({ gmail_remove_dots: false }),
    body('password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('login', { error: 'Please enter a valid email and password.' });
    }

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).lean();
      if (!user) {
        return res.render('login', { error: 'Invalid email or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.render('login', { error: 'Invalid email or password.' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

      res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
      return res.redirect('/profile');
    } catch (error) {
      res.status(500).render('login', { error: 'Server error. Please try again later.' });
    }
  }
);


// Logout Route
router.get('/logout', (req, res) => {
  res.clearCookie('token', { path: '/' }); // Clear the JWT token cookie
  res.redirect('/login'); // Redirect to login page (or homepage)
});


// Show forgot password form
router.get('/forgot', (req, res) => {
  res.render('forgot', { message: null, error: null });
});

// Handle forgot password form submission
router.post('/forgot', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.render('forgot', {
      message: null,
      error: 'Email not found'
    });
  }

  // Generate reset token and send email
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const resetLink = `${baseUrl}/reset/${token}`;


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
  transporter.verify(function (error, success) {
  if (error) {
    console.error('Transporter error:', error);
  } else {
    console.log('Server is ready to send mail');
  }
});


  try {
  await transporter.sendMail({
    to: user.email,
    subject: 'Password Reset',
    html: `<p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`
  });
  return res.render('forgot', {
    message: 'Reset link sent to your email.',
    error: null
  });
} catch (err) {
  console.error('Error sending email:', err);
  return res.render('forgot', {
    message: null,
    error: 'Failed to send email. Please try again later.'
  });
}

});


// Show reset form
router.get('/reset/:token', (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.render('reset', { token });
  } catch {
    res.send('Invalid or expired link.');
  }
});

// Handle new password
router.post('/reset/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.send('User not found.');

    const hashed = await bcrypt.hash(password, 12);
    user.password = hashed;
    await user.save();
    // console.log(password);

    // res.send('Password updated. You can <a href="/login">login</a> now.');
    return res.redirect('/login');
  } catch {
    res.send('Token expired or invalid.');
  }
});



 router.get('/api/check-username', async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  try {
    const exists = await User.exists({ username });
    res.json({ available: !exists });
  } catch (error) {
    console.error('Error checking username:', error);  // Add this
    res.status(500).json({ error: 'Internal Server Error' });
  }


  
  

});

router.get('/api/check-email', async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: 'email is required' });

  try {
    const exists = await User.exists({ email });
    res.json({ available: !exists });
  } catch (error) {
    console.error('Error checking email:', error);  // Add this
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
