document.addEventListener('DOMContentLoaded', function() {
  // Check user's browser theme preference
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initialize theme and icons
  setThemeAndIcons(prefersDarkMode);

function setThemeAndIcons(isDarkMode, force = false) {
  // only proceed if force is true or if body class doesn't yet match desired state
  if (force || (isDarkMode && !document.body.classList.contains('dark')) || (!isDarkMode && !document.body.classList.contains('light'))) {
    document.body.classList.toggle('dark', isDarkMode);
    document.body.classList.toggle('light', !isDarkMode);
    document.getElementById('sun-icon').style.display = isDarkMode ? 'none' : 'inline';
    document.getElementById('moon-icon').style.display = isDarkMode ? 'inline' : 'none';
  
    const logoImage = document.getElementById('logo');
    if (logoImage) {
      logoImage.src = isDarkMode ? 'images/logo_black.svg' : 'images/logo_white.svg';
    }
  }
}
  // Slideshow logic
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  const totalSlides = slides.length;
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  
  function showSlide() {
    slides.forEach((slide, index) => {
      slide.style.display = index === currentSlide ? 'block' : 'none';
    });
    document.getElementById("slideCounter").textContent = `${currentSlide + 1}/${totalSlides}`;

    prevButton.style.display = currentSlide === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentSlide === totalSlides - 1 ? 'none' : 'inline-block';

    const gotoFirstSlideElement = document.getElementById('goto-first-slide');
    gotoFirstSlideElement.style.display = currentSlide === 0 ? 'none' : 'inline-block';
  }

  showSlide();
  
  prevButton.addEventListener('click', function () {
    currentSlide = Math.max(0, currentSlide - 1);
    showSlide();
  });

  nextButton.addEventListener('click', function () {
    currentSlide = Math.min(totalSlides - 1, currentSlide + 1);
    showSlide();
  });

  // Theme toggle logic
  document.getElementById('theme-icon').addEventListener('click', function() {
    const isDarkMode = document.body.classList.contains('dark');
    setThemeAndIcons(!isDarkMode);
  });

  // Go to first slide logic
  document.getElementById('goto-first-slide').addEventListener('click', function (e) {
    e.preventDefault();
    currentSlide = 0;
    showSlide();
  });
});