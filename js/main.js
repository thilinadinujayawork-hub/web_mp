// Select the hamburger menu and the navigation links list
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

// Toggle the mobile navigation menu when the hamburger icon is clicked
hamburgerMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Select the theme toggle button
const themeToggleBtn = document.querySelector('#theme-toggle');

// Restore the saved theme on page load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}

// Toggle dark mode on the body when the theme button is clicked
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}

// Auto-scroll the hero slider when it is present on the page
function initSliderAutoScroll() {
  const sliderTrack = document.querySelector('.slider-track');

  if (!sliderTrack) {
    return;
  }

  const sliderImages = sliderTrack.querySelectorAll('img');

  if (sliderImages.length === 0) {
    return;
  }

  let counter = 0;

  setInterval(() => {
    counter += 1;

    if (counter >= sliderImages.length) {
      counter = 0;
    }

    sliderTrack.style.transform = `translateX(-${counter * 100}%)`;
  }, 3000);
}

initSliderAutoScroll();