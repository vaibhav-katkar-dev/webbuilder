
document.addEventListener('DOMContentLoaded', () => {
  const bindings = {
    logoUrl: { selector: '.preview-logo', type: 'image' },
    businessName: { selector: '.preview-business-name', type: 'text' },
    description: { selector: '.preview-description', type: 'text' },
    phoneNumber: { selector: '.preview-phone', type: 'text' },
    email: { selector: '.preview-email', type: 'text' },
    address: { selector: '.preview-address', type: 'text' },
    services: { selector: '.preview-services', type: 'list' },
    callToActionText: { selector: '.preview-cta-text', type: 'text' },
    callToActionLink: { selector: '.preview-cta-link', type: 'link' },
    facebook: { selector: '.preview-facebook', type: 'link' },
    instagram: { selector: '.preview-instagram', type: 'link' },
    twitter: { selector: '.preview-twitter', type: 'link' },
    linkedin: { selector: '.preview-linkedin', type: 'link' }
  };

  Object.entries(bindings).forEach(([inputId, { selector, type }]) => {
    const input = document.getElementById(inputId);
    const preview = document.querySelector(selector);

    if (!input || !preview) return;

    input.addEventListener('input', () => {
      const val = input.value;

      switch (type) {
        case 'text':
          preview.textContent = val;
          break;
        case 'image':
          preview.src = val;
          break;
        case 'link':
          preview.href = val;
          break;
        case 'list':
          const items = val.split(',').map(item => item.trim()).filter(Boolean);
          preview.innerHTML = items.map(item => `<li class="service-item">${item}</li>`).join('');
          break;
      }
    });
  });
});
