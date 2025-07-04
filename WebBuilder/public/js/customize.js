console.log("Script jjloaded successfully");

document.addEventListener('DOMContentLoaded', () => {
  console.log("Script loaded successfully");

  const formPanel = document.getElementById('formPanel');
  const overlay = document.getElementById('formOverlay');

  // Create the toggle button dynamically
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = '⚙️ Customize';
  toggleBtn.id = 'formToggleBtn';

  Object.assign(toggleBtn.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  });

  document.body.appendChild(toggleBtn);

  // Initially hide the panel using the .hidden class
  formPanel.classList.add('hidden');

  // Toggle button click
  toggleBtn.addEventListener('click', () => {
    const isHidden = formPanel.classList.contains('hidden');
    formPanel.classList.toggle('hidden', !isHidden);
    overlay.classList.toggle('visible', isHidden);
    toggleBtn.textContent = isHidden ? '❌ Close' : '⚙️ Customize';
  });

  // Overlay click closes panel
  overlay.addEventListener('click', () => {
    formPanel.classList.add('hidden');
    overlay.classList.remove('visible');
    toggleBtn.textContent = '⚙️ Customize';
  });

  
});
