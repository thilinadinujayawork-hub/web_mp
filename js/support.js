// Select the feedback form elements.
const feedbackForm = document.querySelector('.feedback-form');
const nameInput = document.querySelector('#support-name');
const emailInput = document.querySelector('#support-email');
const messageInput = document.querySelector('#support-message');
const formErrorMsg = document.querySelector('#form-error-msg');

// Select all FAQ question buttons.
const faqButtons = document.querySelectorAll('.faq-question');

// Use a simple pattern to validate email addresses.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const errors = [];
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue = messageInput.value.trim();

  if (!nameValue) {
    errors.push('Name is required.');
  }

  if (!emailValue) {
    errors.push('Email is required.');
  } else if (!emailPattern.test(emailValue)) {
    errors.push('Please enter a valid email address.');
  }

  if (!messageValue) {
    errors.push('Message is required.');
  }

  if (errors.length > 0) {
    formErrorMsg.textContent = errors.join(' ');
    formErrorMsg.classList.add('active');
    return;
  }

  formErrorMsg.textContent = '';
  formErrorMsg.classList.remove('active');
  feedbackForm.reset();
  alert('Thank you for your feedback!');
});

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const answerId = button.getAttribute('aria-controls');
    const answerElement = document.querySelector(`#${answerId}`);
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    button.classList.toggle('active');
    button.setAttribute('aria-expanded', String(!isExpanded));

    if (answerElement) {
      answerElement.classList.toggle('active');
      answerElement.hidden = isExpanded;
    }
  });
});
