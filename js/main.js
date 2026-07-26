// Select the hamburger menu and the navigation links list
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

// Toggle the mobile navigation menu when the hamburger icon is clicked
hamburgerMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Select the theme toggle button
const themeToggle = document.querySelector('#theme-toggle');

// Toggle dark mode on the body when the theme button is clicked
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});