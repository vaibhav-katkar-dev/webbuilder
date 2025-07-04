  document.addEventListener("DOMContentLoaded", () => {
    const logoInput = document.getElementById('logoImage');
    const logoUrlField = document.getElementById('logoUrl');
    const logoPreview = document.getElementById('logoPreview');

    // ✅ If existing logo URL, show preview
    if (logoUrlField?.value) {
      logoPreview.src = logoUrlField.value;
      logoPreview.style.display = 'block';
    }

    // ✅ Handle new upload
    logoInput?.addEventListener('change', async function () {
      const file = this.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('/api/upload/logo', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.url) {
          logoUrlField.value = data.url;
          logoPreview.src = data.url;
          logoPreview.style.display = 'block';
        } else {
          alert("Upload failed: No URL returned");
        }
      } catch (err) {
        console.error("Upload error:", err);
        alert("Image upload failed");
      }
    });
  });

