const express = require('express');
const router = express.Router();
const Site = require('../models/Site');
const Template = require('../models/Template');
const authenticate = require('../middleware/authenticate');

// GET /mysite - Show all sites created by the logged-in user
router.get('/mysite', authenticate, async (req, res) => {
  try {
    const userSites = await Site.find({ userId: req.user._id });
    res.render('mysite', { sites: userSites });
  } catch (error) {
    console.error('Error fetching user sites:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET /mytemplates - Show all templates created by the logged-in user
router.get('/templates', authenticate, async (req, res) => {
  try {
    const allTemplates = await Template.find({});
    res.render('mytemplats', { templates: allTemplates });
  } catch (error) {
    console.error('Error fetching user templates:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
