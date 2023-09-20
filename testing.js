document.addEventListener('DOMContentLoaded', function() {
  // Check user's browser theme preference
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initialize
  setThemeAndIcons(prefersDarkMode);

  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  function setThemeAndIcons(isDarkMode) {
    // Update body class and icons
    document.body.classList.toggle('dark', isDarkMode);
    document.body.classList.toggle('light', !isDarkMode);
    document.getElementById('sun-icon').style.display = isDarkMode ? 'none' : 'inline';
    document.getElementById('moon-icon').style.display = isDarkMode ? 'inline' : 'none';

    // Update logo
    const logoImage = document.getElementById('logo');
    if (logoImage) {
      const imageSrc = isDarkMode ? 'images/logo_black.svg' : 'images/logo_white.svg';
      logoImage.src = imageSrc;
    }
  }

  function showSlide() {
    // Hide all slides
    slides.forEach((slide, index) => {
      slide.style.display = index === currentSlide ? 'block' : 'none';
    });

    // Update the slide counter
    document.getElementById("slideCounter").textContent = `${currentSlide + 1}/${totalSlides}`;

    // Hide or show the "Previous" and "Next" buttons based on the current slide
    prevButton.style.display = currentSlide === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentSlide === totalSlides - 1 ? 'none' : 'inline-block';
  }

  // Initialize slideshow
  showSlide();

  // Listen for Previous button clicks
  prevButton.addEventListener('click', function () {
    currentSlide = Math.max(0, currentSlide - 1);
    showSlide();
  });

  // Listen for Next button clicks
  nextButton.addEventListener('click', function () {
    currentSlide = Math.min(totalSlides - 1, currentSlide + 1);
    showSlide();
  });

  // Toggle theme and icons when the theme-icon div is clicked
  document.getElementById('theme-icon').addEventListener('click', function() {
    const isDarkMode = document.body.classList.contains('dark');
    setThemeAndIcons(!isDarkMode);
  });
});
