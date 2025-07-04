document.addEventListener('DOMContentLoaded', () => {
  const bannerInput = document.getElementById('bannerImage');
  const bannerUrlInput = document.getElementById('bannerImageUrl');
  const bannerPreview = document.getElementById('bannerImagePreview');

  const galleryInput = document.getElementById('galleryImages');
  const galleryUrlsInput = document.getElementById('galleryImageUrls');
  const galleryPreview = document.getElementById('galleryPreview');

  // Upload Banner Image
  bannerInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload/banner', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        bannerUrlInput.value = data.url;
        bannerPreview.src = data.url;
        bannerPreview.style.display = 'block';
        console.log( bannerUrlInput.value);
      }
    } catch (err) {
      console.error('Banner upload error:', err);
    }
  });

  // Upload Gallery Images
  galleryInput.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    try {
      const res = await fetch('/api/upload/gallery', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.urls) {
        // Save to hidden input for form submission
        galleryUrlsInput.value = JSON.stringify(data.urls);

        // Preview images
        galleryPreview.innerHTML = '';
        data.urls.forEach(url => {
          const img = document.createElement('img');
          img.src = url;
          img.width = 100;
          img.style.marginRight = '10px';
          galleryPreview.appendChild(img);
              console.table(galleryUrlsInput.value);

        });
      }
    } catch (err) {
      console.error('Gallery upload error:', err);
    }
  });
});