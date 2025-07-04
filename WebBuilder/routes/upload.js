const express = require('express');
const router = express.Router();
const { upload } = require('../utils/cloudinary');

// Logo Upload (Single Image)
router.post('/logo', upload.single('image'), (req, res) => {
  try {
    const imageUrl = req.file.path;
        console.table(imageUrl);

    return res.status(200).json({ url: imageUrl });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});
//Banner Upload (Single Image)
router.post('/banner', upload.single('image'), (req, res) => {
  try {
    const imageUrl = req.file.path;
        console.table(imageUrl);

    return res.status(200).json({ url: imageUrl });
  } catch (err) {
    console.error('Banner upload error:', err);
    return res.status(500).json({ message: 'Banner upload failed', error: err.message });
  }
});

// Gallery Upload (Multiple Images)
router.post('/gallery', upload.array('images', 10), (req, res) => {
  try {
    const urls = req.files.map(file => file.path);
        console.table(urls);

    return res.status(200).json({ urls });
  } catch (err) {
    console.error('Gallery upload error:', err);
    return res.status(500).json({ message: 'Gallery upload failed', error: err.message });
  }
});


module.exports = router;
