// Check user's browser theme preference
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set the appropriate class on the body element
document.body.classList.toggle('dark', prefersDarkMode);
document.body.classList.toggle('light', !prefersDarkMode);

// Swap the image based on the theme (if applicable)
const logoImage = document.getElementById('logo');
if (logoImage) {
  const imageSrc = prefersDarkMode ? 'images/logo_black.svg' : 'images/logo_white.svg';
  logoImage.src = imageSrc;
}
