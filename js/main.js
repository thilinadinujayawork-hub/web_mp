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