document.addEventListener('DOMContentLoaded', () => {
  const detectBtn = document.getElementById('detectLocationBtn');
  const latInput = document.getElementById('latitude');
  const lngInput = document.getElementById('longitude');
  const status = document.getElementById('locationStatus');

  if (!detectBtn || !latInput || !lngInput || !status) return;

  // ✅ Show saved location if already filled
  const existingLat = parseFloat(latInput.value);
  const existingLng = parseFloat(lngInput.value);
  if (!isNaN(existingLat) && !isNaN(existingLng)) {
    status.textContent = `📍 Saved location: ${existingLat.toFixed(5)}, ${existingLng.toFixed(5)}`;
  }

  // 📡 On button click: Get live location
  detectBtn.addEventListener('click', () => {
    console.log("📡 Get Location button clicked");
    if ('geolocation' in navigator) {
      status.textContent = '📡 Detecting location...';
      navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    latInput.value = latitude;
    lngInput.value = longitude;

    console.log("🌍 Location set:", latitude, longitude); // ✅ Confirm this logs
    status.textContent = `✅ Location set: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
  },
        (error) => {
          console.error('Geolocation error:', error);
          status.textContent = '⚠️ Could not get your location.';
        }
      );
    } else {
      status.textContent = '❌ Geolocation not supported.';
    }
  });

  document.querySelector('form').addEventListener('submit', (e) => {
  console.log('📝 Latitude:', document.getElementById('latitude').value);
  console.log('📝 Longitude:', document.getElementById('longitude').value);
});

});
