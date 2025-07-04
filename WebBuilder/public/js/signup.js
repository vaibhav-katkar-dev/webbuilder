const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const signupBtn = document.getElementById('signup-btn');
const usernameStatus = document.getElementById('username-status');
const emailStatus = document.getElementById('email-status');
  const warningText = document.getElementById('username-warning');


let isUsernameAvailable = false;
let isEmailAvailable = false;

function updateButtonState() {
  const isEnabled = isUsernameAvailable && isEmailAvailable;
  signupBtn.disabled = !isEnabled;

  if (isEnabled) {
    signupBtn.style.backgroundColor = '#4CAF50'; // Normal green
    signupBtn.style.cursor = 'pointer';
    signupBtn.style.opacity = '1';
  } else {
    signupBtn.style.backgroundColor = '#a5d6a7'; // Light green (disabled look)
    signupBtn.style.cursor = 'not-allowed';
    signupBtn.style.opacity = '0.6';
  }
}


// Username check
usernameInput.addEventListener('input', async () => {
  
  const username = usernameInput.value.trim();
  if (username.length < 3) {
    usernameStatus.textContent = 'Too short';
    usernameStatus.style.color = 'gray';
    isUsernameAvailable = false;
    updateButtonState();
    return;
  }

  try {
    const res = await fetch(`/api/check-username?username=${encodeURIComponent(username)}`);
    const data = await res.json();
    if (data.available) {
      usernameStatus.textContent = '✅ Available';
      usernameStatus.style.color = 'green';
      isUsernameAvailable = true;
    } else {
      usernameStatus.textContent = '❌ Taken';
      usernameStatus.style.color = 'red';
      isUsernameAvailable = false;
    }
  } catch (err) {
    usernameStatus.textContent = '⚠ Error';
    usernameStatus.style.color = 'orange';
    isUsernameAvailable = false;
  }
  updateButtonState();
});

// Email check
emailInput.addEventListener('input', async () => {
  const email = emailInput.value.trim();
  if (!email.includes('@') || email.length < 5) {
    emailStatus.textContent = 'Invalid Email';
    emailStatus.style.color = 'gray';
    isEmailAvailable = false;
    updateButtonState();
    return;
  }

  try {
    const res = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    if (data.available) {
      emailStatus.textContent = '✅ Available';
      emailStatus.style.color = 'green';
      isEmailAvailable = true;
    } else {
      emailStatus.textContent = '❌ Already Registered';
      emailStatus.style.color = 'red';
      isEmailAvailable = false;
    }
  } catch (err) {
    emailStatus.textContent = '⚠ Error';
    emailStatus.style.color = 'orange';
    isEmailAvailable = false;
  }
  updateButtonState();
});



  usernameInput.addEventListener('input', () => {
    const originalValue = usernameInput.value;
    const cleanedValue = originalValue.replace(/\s/g, '');

    // If user tried to add space, show warning
    if (originalValue !== cleanedValue) {
      warningText.style.display = 'block';
    } else {
      warningText.style.display = 'none';
    }

    // Update the input value without spaces
    usernameInput.value = cleanedValue;
  });

  // Optional: prevent spaces via keyboard (just in case)
  usernameInput.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  });
