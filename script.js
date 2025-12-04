// ===================================
// Mobile Menu Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close nav when a link is clicked
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});

// ===================================
// Active Nav Link Highlighting
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    // Check if current page matches link
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === '/' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
    
    // For service detail pages, also mark services.html as active
    if (currentPage.startsWith('service-') && linkPage === 'services.html') {
      link.classList.add('active');
    }
    
    // For home pages, mark appropriate home link as active
    if (currentPage === 'index.html' && linkPage === 'index.html') {
      link.classList.add('active');
    }
    if (currentPage === 'home-alt.html' && linkPage === 'home-alt.html') {
      link.classList.add('active');
    }
  });
});

// ===================================
// Dark Mode Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('hrRecruitTheme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      
      // Save preference
      localStorage.setItem('hrRecruitTheme', isDark ? 'dark' : 'light');
      
      // Update icon
      updateThemeIcon(isDark);
    });
  }
  
  function updateThemeIcon(isDark) {
    if (!themeToggle) return;
    
    // Clear existing content
    themeToggle.innerHTML = '';
    
    // Create SVG icon based on theme
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    // Create text span for mode label
    const textSpan = document.createElement('span');
    
    if (isDark) {
      // Sun icon for light mode toggle (currently in dark mode, so show light)
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '12');
      circle.setAttribute('cy', '12');
      circle.setAttribute('r', '5');
      svg.appendChild(circle);
      
      const lines = [
        {x1: '12', y1: '1', x2: '12', y2: '3'},
        {x1: '12', y1: '21', x2: '12', y2: '23'},
        {x1: '4.22', y1: '4.22', x2: '5.64', y2: '5.64'},
        {x1: '18.36', y1: '18.36', x2: '19.78', y2: '19.78'},
        {x1: '1', y1: '12', x2: '3', y2: '12'},
        {x1: '21', y1: '12', x2: '23', y2: '12'},
        {x1: '4.22', y1: '19.78', x2: '5.64', y2: '18.36'},
        {x1: '18.36', y1: '5.64', x2: '19.78', y2: '4.22'}
      ];
      
      lines.forEach(line => {
        const lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineEl.setAttribute('x1', line.x1);
        lineEl.setAttribute('y1', line.y1);
        lineEl.setAttribute('x2', line.x2);
        lineEl.setAttribute('y2', line.y2);
        svg.appendChild(lineEl);
      });
      
      textSpan.textContent = 'Light';
    } else {
      // Moon icon for dark mode toggle (currently in light mode, so show dark)
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z');
      svg.appendChild(path);
      
      textSpan.textContent = 'Dark';
    }
    
    themeToggle.appendChild(svg);
    themeToggle.appendChild(textSpan);
  }
});

// ===================================
// Back to Top Button
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// ===================================
// Contact Form Validation
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('#contactForm') || document.querySelector('.contact-form form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form elements
      const nameInput = contactForm.querySelector('input[name="name"]');
      const emailInput = contactForm.querySelector('input[name="email"]');
      const messageInput = contactForm.querySelector('textarea[name="message"]');
      const honeypotInput = contactForm.querySelector('.honeypot input');
      const messageDiv = contactForm.querySelector('.form-message');
      
      // Reset previous messages
      messageDiv.className = 'form-message';
      messageDiv.textContent = '';
      messageDiv.style.display = 'none';
      
      // Honeypot check (spam protection)
      if (honeypotInput && honeypotInput.checked) {
        // This is likely spam, silently fail
        return;
      }
      
      // Validate required fields
      let isValid = true;
      const errors = [];
      
      if (!nameInput.value.trim()) {
        isValid = false;
        errors.push('Name is required');
        nameInput.style.borderColor = '#ef4444';
      } else {
        nameInput.style.borderColor = '';
      }
      
      if (!emailInput.value.trim()) {
        isValid = false;
        errors.push('Email is required');
        emailInput.style.borderColor = '#ef4444';
      } else {
        emailInput.style.borderColor = '';
      }
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        errors.push('Please enter a valid email address');
        emailInput.style.borderColor = '#ef4444';
      } else if (emailInput.value.trim()) {
        emailInput.style.borderColor = '';
      }
      
      if (!messageInput.value.trim()) {
        isValid = false;
        errors.push('Message is required');
        messageInput.style.borderColor = '#ef4444';
      } else {
        messageInput.style.borderColor = '';
      }
      
      if (!isValid) {
        messageDiv.className = 'form-message error';
        messageDiv.textContent = errors.join('. ');
        messageDiv.style.display = 'block';
        return;
      }
      
      // Form is valid - show success message
      messageDiv.className = 'form-message success';
      messageDiv.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
      messageDiv.style.display = 'block';
      
      // Reset form
      contactForm.reset();
      
      // Clear error styles after 3 seconds
      setTimeout(() => {
        messageDiv.style.display = 'none';
        [nameInput, emailInput, messageInput].forEach(input => {
          if (input) input.style.borderColor = '';
        });
      }, 5000);
    });
  }
});

// ===================================
// Home Dropdown
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  const homeDropdownLabels = document.querySelectorAll('.home-dropdown-label');
  
  homeDropdownLabels.forEach(label => {
    label.addEventListener('click', function(e) {
      e.stopPropagation();
      const dropdown = this.closest('.home-dropdown');
      const allDropdowns = document.querySelectorAll('.home-dropdown');
      
      // Close all other dropdowns
      allDropdowns.forEach(dd => {
        if (dd !== dropdown) {
          dd.classList.remove('open');
        }
      });
      
      // Toggle current dropdown
      dropdown.classList.toggle('open');
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.home-dropdown')) {
      document.querySelectorAll('.home-dropdown').forEach(dd => {
        dd.classList.remove('open');
      });
    }
  });
});

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#' || href === '#!') {
        return;
      }
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// ===================================
// Add loading animation class removal
// ===================================
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// ===================================
// Error Handling for Browser Extensions
// ===================================
// Suppress harmless errors from browser extensions
window.addEventListener('error', function(e) {
  // Ignore message channel errors from browser extensions
  if (e.message && e.message.includes('message channel')) {
    e.preventDefault();
    return false;
  }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
  // Ignore message channel errors from browser extensions
  if (e.reason && e.reason.message && e.reason.message.includes('message channel')) {
    e.preventDefault();
    return false;
  }
});

// ===================================
// Phone Number Formatting
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="phone"]');
  
  phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, ''); // Remove all non-digits
      
      // Format as (XXX) XXX-XXXX for US numbers
      if (value.length > 0) {
        if (value.length <= 3) {
          value = '(' + value;
        } else if (value.length <= 6) {
          value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
        } else {
          value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 10);
        }
      }
      
      e.target.value = value;
    });
    
    // Allow backspace to work properly
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && e.target.value.length === 1) {
        e.target.value = '';
      }
    });
  });
});

// ===================================
// Enhanced Email Validation with Regex
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  // Enhanced email regex pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  const emailInputs = document.querySelectorAll('input[type="email"]');
  
  emailInputs.forEach(input => {
    // Real-time validation on blur
    input.addEventListener('blur', function() {
      const value = this.value.trim();
      if (value && !emailRegex.test(value)) {
        this.style.borderColor = '#ef4444';
        this.setCustomValidity('Please enter a valid email address');
      } else {
        this.style.borderColor = '';
        this.setCustomValidity('');
      }
    });
    
    // Clear error on input
    input.addEventListener('input', function() {
      if (this.style.borderColor === 'rgb(239, 68, 68)') {
        this.style.borderColor = '';
        this.setCustomValidity('');
      }
    });
  });
  
  // Update contact form validation to use enhanced regex
  const contactForm = document.querySelector('#contactForm') || document.querySelector('.contact-form form');
  if (contactForm) {
    const originalSubmit = contactForm.onsubmit;
    contactForm.addEventListener('submit', function(e) {
      const emailInput = contactForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
        e.preventDefault();
        emailInput.style.borderColor = '#ef4444';
        emailInput.focus();
        const messageDiv = contactForm.querySelector('.form-message');
        if (messageDiv) {
          messageDiv.className = 'form-message error';
          messageDiv.textContent = 'Please enter a valid email address';
          messageDiv.style.display = 'block';
        }
        return false;
      }
    });
  }
});

// ===================================
// Remember Me Functionality
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const rememberCheckbox = document.querySelector('#remember');
  
  if (loginForm && rememberCheckbox) {
    // Load saved credentials if "Remember me" was checked
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedRemember = localStorage.getItem('rememberMe') === 'true';
    
    if (savedEmail && savedRemember) {
      const emailInput = loginForm.querySelector('#email');
      if (emailInput) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
      }
    }
    
    // Save credentials on form submit if "Remember me" is checked
    loginForm.addEventListener('submit', function(e) {
      if (rememberCheckbox.checked) {
        const emailInput = loginForm.querySelector('#email');
        if (emailInput && emailInput.value) {
          localStorage.setItem('rememberedEmail', emailInput.value);
          localStorage.setItem('rememberMe', 'true');
        }
      } else {
        // Clear saved credentials if unchecked
        localStorage.removeItem('rememberedEmail');
        localStorage.setItem('rememberMe', 'false');
      }
    });
  }
});

// ===================================
// File Upload Handling
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  const fileInputs = document.querySelectorAll('input[type="file"]');
  
  fileInputs.forEach(input => {
    // Add file size validation (max 10MB)
    input.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (file.size > maxSize) {
          alert('File size must be less than 10MB');
          e.target.value = '';
          return;
        }
        
        // Show file name
        const fileName = file.name;
        let fileDisplay = e.target.parentElement.querySelector('.file-name-display');
        if (!fileDisplay) {
          fileDisplay = document.createElement('span');
          fileDisplay.className = 'file-name-display';
          fileDisplay.style.cssText = 'display: block; margin-top: 0.5rem; font-size: 0.875rem; color: var(--text-light);';
          e.target.parentElement.appendChild(fileDisplay);
        }
        fileDisplay.textContent = 'Selected: ' + fileName;
      }
    });
  });
});

// ===================================
// Login Redirect to Dashboard
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = loginForm.querySelector('#email').value;
      const password = loginForm.querySelector('#password').value;
      const messageDiv = loginForm.querySelector('.form-message');
      
      // Basic validation
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      
      if (!email || !emailRegex.test(email)) {
        if (messageDiv) {
          messageDiv.className = 'form-message error';
          messageDiv.textContent = 'Please enter a valid email address';
          messageDiv.style.display = 'block';
        }
        return;
      }
      
      if (!password || password.length < 6) {
        if (messageDiv) {
          messageDiv.className = 'form-message error';
          messageDiv.textContent = 'Password must be at least 6 characters';
          messageDiv.style.display = 'block';
        }
        return;
      }
      
      // Store login state
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userEmail', email);
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 500);
    });
  }
});

