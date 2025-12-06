/* =================================================================
   NEO SAKURA NOIR - Portfolio JavaScript
   Smooth scrolling, active nav, reveal on scroll, and form handling
   ================================================================= */

/**
 * 1. SMOOTH SCROLL FOR NAVBAR LINKS & ACTION BUTTONS
 * Intercepts all links with href starting with '#' and smoothly scrolls to target
 */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/**
 * 2. ACTIVE NAV LINK ON SCROLL
 * Uses IntersectionObserver to detect which section is in view
 * and updates the nav link with .active class
 */
const observerOptions = {
  threshold: 0.3
};

const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove active class from all links
      navLinks.forEach(link => link.classList.remove('active'));
      
      // Add active class to the corresponding nav link
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}, observerOptions);

// Observe all sections
sections.forEach(section => scrollObserver.observe(section));

/**
 * 3. REVEAL ON SCROLL ANIMATION
 * Uses IntersectionObserver to add .visible class to elements with .reveal class
 * CSS handles the animation transition
 */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: unobserve to prevent re-triggering
      // revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(element => revealObserver.observe(element));

/**
 * 4. CONTACT FORM HANDLER
 * Prevents default submit, validates fields, shows alert, and clears form
 */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    
    // Email validation regex (simple)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Show success message
    alert('Thank you! Your message has been recorded.');
    
    // Clear the form
    contactForm.reset();
  });
}

/**
 * 5. OPTIONAL: Add keyboard navigation for smooth scroll
 * Users can use Tab key to navigate links
 */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    // Tab key navigation is handled by browser by default
    // Links are already focusable, this is just a note
  }
});

console.log('Neo Sakura Noir Portfolio - Initialized ✨');