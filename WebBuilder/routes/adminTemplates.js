const express = require('express');
const router = express.Router();
const Template = require('../models/Template');

// Render admin template dashboard (GET /admin)
router.get('/', async (req, res) => {
  try {
    const templates = await Template.find();
    res.render('admin/index', { templates }); // render EJS view with templates
  } catch (err) {
    res.status(500).send('Failed to load templates');
  }
});

// Render form to add new template (GET /admin/new)
router.get('/new', (req, res) => {
  res.render('admin/new'); // show empty form
});

// Add a new template (POST /admin/templates)
router.post('/templates', async (req, res) => {
  try {
    const newTemplate = new Template(req.body);
    await newTemplate.save();
    res.redirect('/admin');
  } catch (err) {
    res.status(400).send('Error adding template');
  }
});

// Render form to edit a template (GET /admin/edit/:templateId)
router.get('/edit/:templateId', async (req, res) => {
  try {
    const template = await Template.findOne({ templateId: req.params.templateId });
    if (!template) return res.status(404).send('Template not found');
    res.render('admin/edit', { template });
  } catch (err) {
    res.status(500).send('Failed to load template for editing');
  }
});

// Update template (POST /admin/update/:templateId)
router.post('/update/:templateId', async (req, res) => {
  try {
    const updated = await Template.findOneAndUpdate(
      { templateId: req.params.templateId },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).send('Template not found');
    res.redirect('/admin');
  } catch (err) {
    res.status(400).send('Failed to update template');
  }
});


// DELETE template (GET /admin/delete/:templateId)
router.get('/delete/:templateId', async (req, res) => {
  try {
    const { templateId } = req.params;
    const deleted = await Template.findOneAndDelete({ templateId });
    if (!deleted) return res.status(404).send('Template not found');
    res.redirect('/admin');
  } catch (err) {
    res.status(500).send('Failed to delete template');
  }
});

module.exports = router;
