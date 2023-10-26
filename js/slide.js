document.addEventListener('DOMContentLoaded', function () {
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

            // Toggle theme classes on navigation buttons
            const navButtons = document.querySelectorAll('.nav-button');
            navButtons.forEach((button) => {
                button.classList.toggle('light', !isDarkMode);
                button.classList.toggle('dark', isDarkMode);
            });
        }
    }

    // Slideshow logic
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const totalSlides = slides.length;

    const slideNavContainer = document.createElement('ul'); // Changed to 'ul' to represent an unordered list
    slideNavContainer.id = 'slide-nav';
    document.body.appendChild(slideNavContainer); // Append the navigation container to the body

    function initializeNavigation() {
        slides.forEach((slide, index) => {
            const h2Text = slide.querySelector('h2') ? slide.querySelector('h2').textContent : 'Slide ' + (index + 1);
            const navButton = document.createElement('li');
            navButton.textContent = h2Text;
            navButton.classList.add('nav-button');
            if (index === 0) {
                navButton.classList.add('active'); // Add the "active" class to the first button
            }
            navButton.addEventListener('click', function () {
                currentSlide = index;
                showSlide();
            });
            slideNavContainer.appendChild(navButton);
        });
    }

    function showSlide() {
        slides.forEach((slide, index) => {
            slide.style.display = index === currentSlide ? 'block' : 'none';
        });
        const navButtons = document.querySelectorAll('.nav-button');
        navButtons.forEach((button, index) => {
            button.classList.toggle('active', index === currentSlide);
        });

        document.getElementById("slideCounter").textContent = `${currentSlide + 1}/${totalSlides}`;
    }

    showSlide();
    initializeNavigation();

    // Theme toggle logic
    document.getElementById('theme-icon').addEventListener('click', function () {
        const isDarkMode = document.body.classList.contains('dark');
        setThemeAndIcons(!isDarkMode);
    });
});

