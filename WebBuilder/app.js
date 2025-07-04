require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const path = require('path');
const { Site, Template } = require('./models/index');
const ejs = require('ejs');


// Routes
const uploadRoutes = require('./routes/upload');
const authRoutes = require('./routes/auth');
const profileRoute = require('./routes/profile');
const siteRoutes = require('./routes/siteRoutes');
const adminTemplateRoutes = require('./routes/adminTemplates');
const dashboardRoutes = require('./routes/navRoutes');

const User = require('./models/User'); // adjust path if different

const app = express();

// ===== Middleware =====
app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.use(express.static('public', { maxAge: '1d' })); // Cache static files

// app.use(helmet()); // Secure headers
// app.use(helmet({ contentSecurityPolicy: false }));



app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        'https://cdn.jsdelivr.net',
        'https://unpkg.com', // Allow Leaflet CDN
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        'https://fonts.googleapis.com',
        'https://cdn.jsdelivr.net',
        'https://unpkg.com', // Allow Leaflet CSS
        'http://localhost:3000', // ✅ allow local styles
      ],
      imgSrc: [
        "'self'",
        'data:',
        'blob:',
        'https://res.cloudinary.com',
        'https://media.licdn.com', // ✅ allow LinkedIn images
        'https://unpkg.com', // Allow Leaflet marker icons
      ],
      fontSrc: [
        "'self'",
        'https://fonts.gstatic.com',
        'https://cdn.jsdelivr.net',
      ],
      connectSrc: [
        "'self'",
        'https://res.cloudinary.com',
        'https://api.cloudinary.com',
      ],
      frameSrc: [
        "'self'",
        'https://www.google.com',
      ],
    }
  }
}));





app.use(compression()); // Gzip responses
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rate limiter
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 }));

app.use('/api/upload', uploadRoutes); // Now /api/upload/logo works


// ===== User Auth Middleware (Global) =====
app.use(async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      res.locals.user = user;
    } catch (err) {
      console.warn('JWT verification failed:', err.message);
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
});



app.use(async (req, res, next) => {
  const host = req.headers.host; // e.g., vaibhav.localhost:3000
  const mainDomain = 'webbuilder-21cx.onrender.com'; // Use your actual domain in production

  const hostname = host.split(':')[0]; // remove :3000
  const parts = hostname.split('.');

  // Not a subdomain request, skip
  if (!hostname.endsWith(mainDomain) || parts.length !== 2) {
    return next();
  }

  const subdomain = parts[0]; // e.g., vaibhav

  try {
    const site = await Site.findOne({ subdomain, isPublished: true });

    if (!site) {
      return res.status(404).send('🚫 Site not found or not published');
    }

    const template = await Template.findOne({ templateId: site.templateId });
    if (!template) {
      return res.status(404).send('🚫 Template not found');
    }

    const content = site.fields || {};
    
    // ✅ Attach location if present
    if (site.location && Array.isArray(site.location.coordinates)) {
      content.location = site.location; // { type: "Point", coordinates: [lng, lat] }
    }

    const compiledHtml = ejs.render(template.html || '', { content });

    return res.render('template', {
      title: content.businessName || 'User Site',
      css: template.css || '',
      html: compiledHtml,
      js: template.js || '',
      template: {},
      site,
      content,
      businessName: content.businessName || '',
      callToActionText: content.callToActionText || ''
    });
  } catch (err) {
    console.error('Error in subdomain render:', err);
    return res.status(500).send('Internal Server Error');
  }
});



// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ===== Routes =====
app.use('/', authRoutes);
app.use('/profile', profileRoute);
app.use('/profile', dashboardRoutes);
app.use('/site', siteRoutes);
app.use('/admin', adminTemplateRoutes);

// ===== Views =====
app.get('/', (req, res) => res.render("home"));



// ===== Server Start =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
