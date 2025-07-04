const express = require('express');
const router = express.Router();
const ejs = require('ejs');

const mongoose = require('mongoose');
const { User, Site, Template } = require('../models');
const authenticate = require('../middleware/authenticate');


// ===========================
// GET: Template selection
// ===========================
// Handle subdomain-based site rendering
// GET: Render site via subdomain (vaibhav.localhost)
router.get('/', async (req, res, next) => {
  const subdomain = req.subdomain;

  // If no subdomain (main site/homepage), skip
  if (!subdomain) return next();

  try {
    const site = await Site.findOne({ subdomain, isPublished: true });
    if (!site) return res.status(404).send('🚫 Site not found or not published');

    const template = await Template.findOne({ templateId: site.templateId });
    if (!template) return res.status(404).send('🚫 Template not found');

    const content = site.fields || {};
    const compiledHtml = ejs.render(template.html || '', { content });

    res.render('template', {
      title: content.businessName || 'User Site',
      css: template.css || '',
      html: compiledHtml,
      template: {},
      site,
      content,
      businessName: content.businessName || '',
      callToActionText: content.callToActionText || ''
    });
  } catch (err) {
    console.error("Subdomain site render error:", err);
    res.status(500).send("Internal Server Error");
  }
});


// ===========================
// GET: Customize Template
// ===========================
// ✅ Fix for customize page to match subdomain rendering
router.get('/customize/:id', authenticate, async (req, res) => {
  try {
    const templateId = req.params.id.trim();
    const template = await Template.findOne({ templateId });
    if (!template) return res.status(404).send('Template not found');

    const user = req.user;
    const userSite = await Site.findOne({
      templateId,
      username: user.username,
    });

    const defaultFields = template.defaultFields || {};

    const fields = {
      businessName: '',
      description: '',
      phoneNumber: '',
      email: '',
      address: '',
      logoUrl: '',
      services: [],
      callToActionText: '',
      callToActionLink: '',
      socialLinks: {
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: ''
      },
      ...defaultFields,
      ...(userSite?.fields || {})
    };

    // ✅ Attach location if exists
    if (userSite?.location && Array.isArray(userSite.location.coordinates)) {
      fields.location = userSite.location;
    } else {
      fields.location = { type: 'Point', coordinates: [null, null] };
    }

    const compiledHtml = ejs.render(template.html || '', { content: fields });

    // ✅ Render to match subdomain style
    res.render('customize', {
      template: {
        ...template.toObject(),
        html: compiledHtml,
        fields
      },
      
      html: compiledHtml,
      css: template.css || '',
      js: template.js || '',
      username: user.username,
      templateId: template.templateId,
      content: fields,
      businessName: fields.businessName || '',
      callToActionText: fields.callToActionText || '',
      
    });

  } catch (err) {
    console.error("Customize GET error:", err);
    res.status(500).send("Error rendering site.");
  }
});



const jwt = require('jsonwebtoken');

router.post('/create', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).send('User not found');

    const {
      templateId, logoUrl, businessName, description,
      phoneNumber, email, address, services,
      facebook, instagram, twitter, linkedin, bannerImage,
      galleryImages ,
      callToActionText, callToActionLink,location
    } = req.body;

    const trimmedTemplateId = templateId?.trim();
    const fields = {
      logoUrl: logoUrl?.trim() || '',
      businessName: businessName?.trim() || '',
      description: description?.trim() || '',
      phoneNumber: phoneNumber?.trim() || '',
      email: email?.trim() || '',
      address: address?.trim() || '',
      bannerImage: bannerImage?.trim() || '',
      services: services?.split(',').map(s => s.trim()).filter(Boolean) || [],
      socialLinks: {
        facebook: facebook?.trim() || '',
        instagram: instagram?.trim() || '',
        twitter: twitter?.trim() || '',
        linkedin: linkedin?.trim() || '',
      },
      callToActionText: callToActionText?.trim() || '',
      callToActionLink: callToActionLink?.trim() || '',
       galleryImages: (() => {
        try {
          const parsed = JSON.parse(galleryImages);
          return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
        } catch {
          return [];
        }
      })()
    };

    const parsedLocation = {
      type: 'Point',
      coordinates: [
        parseFloat(req.body.location?.coordinates?.[0] || 0), // longitude
        parseFloat(req.body.location?.coordinates?.[1] || 0)  // latitude
      ]
    };

    // console.table(fields);
    // Check if a site already exists for this user and template
    let existingSite = await Site.findOne({ userId: user._id, templateId: trimmedTemplateId });

    if (existingSite) {
      // Update existing site
      existingSite.fields = fields;
      await existingSite.save();
      return res.redirect(`/site/${existingSite._id}`);
    } else {
      // Create new site
      const newSite = await Site.create({
        userId: user._id,
        username: user.username,
        templateId: trimmedTemplateId,
        fields,
         subdomain: null,
        isPublished: false,   
        location: parsedLocation

      });
      return res.redirect(`/site/${newSite._id}`);
      // return res.redirect(`http://${newSite.username}.localhost:3000`);

    }
  } catch (error) {
    console.error("Website Creation Error:", error);
    res.status(500).send('Error creating or updating website.');
  }
});






router.get('/:id', authenticate, async (req, res) => {
  try {
    const siteId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(siteId)) {
      return res.status(400).send('Invalid site ID');
    }


    const site = await Site.findById(siteId);
    if (!site) return res.status(404).send('Site not found');
     const template = await Template.findOne({ templateId: site.templateId });
    if (!template) {
      return res.status(404).send('Template not found');
    }

    // Dummy HTML for testing
    const dummyHtml = template.html;
// console.log(template.html)
    const content = site.fields || {};

    // Compile the dummy EJS HTML
    const compiledHtml = ejs.render(dummyHtml, { content });
  //   res.render('template', {
  //     title: content.businessName || 'My Site',
  // css: template.css || '',            // ✅ this line is REQUIRED
  //     html: compiledHtml, // ✅ compiled HTML
  //     template: {},        // dummy
  //     site,
  //     content,
  //     businessName: content.businessName || '',
  //     callToActionText: content.callToActionText || ''
  //   });

  res.render('siteSetting',{ site,});

  } catch (error) {
    console.error('Error rendering site:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST /site/:id/publish - Set subdomain and publish the site
router.post('/:id/publish', authenticate, async (req, res) => {
  const { subdomain } = req.body;
  const siteId = req.params.id;

  if (!subdomain || !/^[a-z0-9-]{3,30}$/i.test(subdomain)) {
    return res.status(400).json({ message: 'Invalid subdomain' });
  }

  try {
    const existing = await Site.findOne({ subdomain: subdomain.toLowerCase() });
    if (existing) return res.status(400).json({ message: 'Subdomain already in use' });

    const site = await Site.findById(siteId);
    if (!site) return res.status(404).send('Site not found');

    // Ensure the logged-in user owns the site
    if (site.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send('Not authorized to publish this site');
    }

    site.subdomain = subdomain.toLowerCase();
    site.isPublished = true;
    await site.save();

    res.redirect(`http://${subdomain}.localhost:3000`);
  } catch (error) {
    console.error("Publish error:", error);
    res.status(500).send("Error publishing site");
  }
});

// Toggle publish/unpublish based on current state
router.post('/:id/toggle-publish', authenticate, async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) return res.status(404).send('Site not found');

    // Authorization check
    if (site.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send('Unauthorized');
    }

    // Prevent publishing without a subdomain
    if (!site.isPublished && !site.subdomain) {
      return res.status(400).send('Subdomain is required before publishing');
    }

    // Flip the publish state
    site.isPublished = !site.isPublished;
    await site.save();

    // ✅ Just reload the current dashboard or settings page
    res.redirect(`/site/${site._id}`);
  } catch (err) {
    console.error('Toggle publish error:', err);
    res.status(500).send('Server error');
  }
});


// POST /site/delete/:id
router.post('/delete/:id', authenticate, async (req, res) => {
  const siteId = req.params.id;

  try {
    const site = await Site.findById(siteId);
    if (!site) return res.status(404).send('Site not found');

    // Ensure the logged-in user owns the site
    if (site.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send('Not authorized to delete this site');
    }

    await Site.deleteOne({ _id: siteId });
    res.redirect('/profile'); // or wherever you list sites
  } catch (err) {
    console.error('Site Deletion Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
