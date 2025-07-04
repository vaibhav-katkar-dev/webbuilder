const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  templateId: {
    type: String,
    required: true,
    unique: true
  },
  templateName: {
    type: String,
    required: true
  },
  previewImage: {
    type: String // optional thumbnail for selection
  }, html: {
    type: String, // ✅ to store entire EJS-based HTML string
    required: true
  },
  css: {
    type: String // optional if you want to store external or inline CSS
  },
  js: {
    type: String // ✅ optional JavaScript string for custom behaviors
  },
  defaultFields: {
    logoUrl: String,
    businessName: String,
    description: String,
    phoneNumber: String,
    email: String,
    address: String,
     bannerImage: String,        // ✅ Large top-section image
  galleryImages: [String],    // ✅ Array for multiple gallery photos
    services: [String],
    callToActionText: String,
    callToActionLink: String,
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Template', TemplateSchema);
