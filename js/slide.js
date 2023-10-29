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

    const slideNavContainer = document.createElement('ul');
    slideNavContainer.id = 'slide-nav';
    document.body.appendChild(slideNavContainer);

    function initializeNavigation() {
        slides.forEach((slide, index) => {
            const h2Text = slide.querySelector('h2') ? slide.querySelector('h2').textContent : 'Slide ' + (index + 1);
            const navButton = document.createElement('li');
            navButton.textContent = h2Text;
            navButton.classList.add('nav-button');
            if (index === 0) {
                navButton.classList.add('active');
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
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');

        if (currentSlide === totalSlides - 1) {
            nextButton.style.display = 'none';
            prevButton.textContent = 'Restart';
            prevButton.classList.add('restart'); // Add the restart class
        } else {
            nextButton.style.display = 'inline-block';
            prevButton.textContent = 'Previous';
            prevButton.classList.remove('restart'); // Remove the restart class
        }

        if (currentSlide === 0) {
            prevButton.style.display = 'none';
        } else {
            prevButton.style.display = 'inline-block';
        }
    }

    showSlide();
    initializeNavigation();

    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');

    if (nextButton) {
        nextButton.addEventListener('click', function () {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                showSlide();
            }
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', function () {
            if (currentSlide === totalSlides - 1) {
                currentSlide = 0;
                showSlide();
            } else if (currentSlide > 0) {
                currentSlide--;
                showSlide();
            }
        });
    }

    // Theme toggle logic
    document.getElementById('theme-icon').addEventListener('click', function () {
        const isDarkMode = document.body.classList.contains('dark');
        setThemeAndIcons(!isDarkMode, true);
    });
});
