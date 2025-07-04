const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
   // ✅ Location field: [longitude, latitude]
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  },

  subdomain: {
    type: String,
    unique: true,
    sparse: true,     // allows multiple nulls when subdomain is not set
    lowercase: true,
    trim: true,
    match: /^[a-z0-9-]{3,30}$/  // optional: only allow valid subdomain patterns
  },

  isPublished: {
    type: Boolean,
    default: false
  },
  
    username: { type: String, required: true,  lowercase: true },

  templateId: {
    type: String,
    required: true
  },
  fields: {
    logoUrl: String,
    businessName: String,
    description: String,
    phoneNumber: String,
    email: String,
    address: String,
     bannerImage: String,        // ✅ Large top-section image    img
  galleryImages: [String],    // ✅ Array for multiple gallery photos   IMG
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

module.exports = mongoose.model('Site', SiteSchema);
