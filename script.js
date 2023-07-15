// Check user's browser theme preference
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set the appropriate class on the body element
document.body.classList.toggle('dark', prefersDarkMode);
document.body.classList.toggle('light', !prefersDarkMode);

// Swap the image based on the theme
const logoImage = document.getElementById('logo');
const imageSrc = prefersDarkMode ? 'images/logo_black.svg' : 'images/logo_white.svg';
logoImage.src = imageSrc;