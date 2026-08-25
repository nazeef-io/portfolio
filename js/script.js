/* ==========================================================================
   Nazeef Ullah — DevOps Portfolio
   Vanilla JS — modular, no dependencies
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileNav();
  initSmoothScroll();
  initActiveNavHighlight();
  initScrollReveal();
  initTerminalTyping();
  initBackToTop();
  initContactForm();
  initFooterYear();
});

/* ------------------------------------------------------------------------
   Sticky navbar background on scroll
   ------------------------------------------------------------------------ */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');

  if (!navbar) return;

  const toggle = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 20);
  };

  toggle();

  window.addEventListener('scroll', toggle, {
    passive: true
  });
}

/* ------------------------------------------------------------------------
   Mobile hamburger menu
   ------------------------------------------------------------------------ */
function initMobileNav() {
  const toggleBtn = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (!toggleBtn || !links) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');

    toggleBtn.classList.toggle('is-open', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('[data-nav]').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggleBtn.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ------------------------------------------------------------------------
   Smooth scrolling for in-page anchors
   ------------------------------------------------------------------------ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');

      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      const navHeight =
        document.getElementById('navbar')?.offsetHeight || 0;

      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        navHeight +
        1;

      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    });
  });
}

/* ------------------------------------------------------------------------
   Highlight active nav link based on scroll position
   ------------------------------------------------------------------------ */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${id}`
      );
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

/* ------------------------------------------------------------------------
   Scroll reveal animations
   ------------------------------------------------------------------------ */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');

  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  items.forEach((item) => {
    observer.observe(item);
  });
}

/* ------------------------------------------------------------------------
   Hero terminal — typed "whoami" command with output
   ------------------------------------------------------------------------ */
function initTerminalTyping() {
  const commandEl = document.getElementById('typedCommand');
  const outputEl = document.getElementById('terminalOutput');
  const cursorEl = document.getElementById('typeCursor');

  if (!commandEl || !outputEl) return;

  const command = 'whoami --role';

  const outputLines = [
    'nazeef-ullah',
    'role: DevOps Engineer',
    'focus: CI/CD, IaC, Cloud, Containers',
    'status: <span class="highlight">available for opportunities</span>'
  ];

  const prefersReducedMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

  if (prefersReducedMotion) {
    commandEl.textContent = command;

    outputEl.innerHTML = outputLines
      .map((line) => `<p style="opacity:1">${line}</p>`)
      .join('');

    if (cursorEl) {
      cursorEl.style.display = 'none';
    }

    return;
  }

  let charIndex = 0;
  const typeSpeed = 55;

  function typeCommand() {
    if (charIndex <= command.length) {
      commandEl.textContent = command.slice(0, charIndex);

      charIndex++;

      setTimeout(typeCommand, typeSpeed);
    } else {
      setTimeout(printOutput, 300);
    }
  }

  let lineIndex = 0;

  function printOutput() {
    if (lineIndex >= outputLines.length) return;

    const p = document.createElement('p');

    p.innerHTML = outputLines[lineIndex];
    p.style.animationDelay = '0s';

    outputEl.appendChild(p);

    lineIndex++;

    setTimeout(printOutput, 380);
  }

  typeCommand();
}

/* ------------------------------------------------------------------------
   Back-to-top button
   ------------------------------------------------------------------------ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');

  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle(
        'is-visible',
        window.scrollY > 600
      );
    },
    {
      passive: true
    }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ------------------------------------------------------------------------
   Contact form validation + API submission
   ------------------------------------------------------------------------ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');

  if (!form || !statusEl) return;

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError')
    },

    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError')
    },

    subject: {
      input: document.getElementById('subject'),
      error: document.getElementById('subjectError')
    },

    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError')
    }
  };

  /* Safety check */
  const isFieldValid = Object.values(fields).every(
    ({ input, error }) => input && error
  );

  if (!isFieldValid) {
    console.error('Contact form fields are missing.');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ----------------------------------------------------------------------
     Validate individual field
     ---------------------------------------------------------------------- */
  function validateField(key) {
    const { input, error } = fields[key];

    const row = input.closest('.form__row');

    const value = input.value.trim();

    let message = '';

    if (!value) {
      message = 'This field is required.';
    }

    else if (
      key === 'email' &&
      !emailPattern.test(value)
    ) {
      message = 'Enter a valid email address.';
    }

    else if (
      key === 'message' &&
      value.length < 10
    ) {
      message = 'Message should be at least 10 characters.';
    }

    error.textContent = message;

    if (row) {
      row.classList.toggle(
        'has-error',
        Boolean(message)
      );
    }

    return !message;
  }

  /* ----------------------------------------------------------------------
     Validate fields when user leaves input
     ---------------------------------------------------------------------- */
  Object.keys(fields).forEach((key) => {
    fields[key].input.addEventListener(
      'blur',
      () => validateField(key)
    );
  });

  /* ----------------------------------------------------------------------
     Submit form to Express backend
     ---------------------------------------------------------------------- */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    statusEl.textContent = '';

    /* Validate all fields */
    const isValid = Object.keys(fields)
      .map((key) => validateField(key))
      .every(Boolean);

    if (!isValid) {
      statusEl.style.color = 'var(--danger)';
      statusEl.textContent =
        'Please fix the errors above before sending.';

      return;
    }

    /* Prepare data */
    const formData = {
      name: fields.name.input.value.trim(),
      email: fields.email.input.value.trim(),
      subject: fields.subject.input.value.trim(),
      message: fields.message.input.value.trim()
    };

    try {
      statusEl.style.color = 'var(--accent-cyan)';
      statusEl.textContent = 'Sending message...';

      /* Disable button while request is running */
      const submitButton =
        form.querySelector('button[type="submit"]');

      if (submitButton) {
        submitButton.disabled = true;
      }

      /* Send data to Express API */
      const response = await fetch('/api/contact', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(formData)
      });

      /* Parse response */
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
          'Failed to send message.'
        );
      }

      statusEl.style.color = 'var(--accent-cyan)';
      statusEl.textContent =
        'Message sent successfully!';

      form.reset();

    } catch (error) {
      console.error('Contact form error:', error);

      statusEl.style.color = 'var(--danger)';

      statusEl.textContent =
        error.message ||
        'Something went wrong. Please try again.';

    } finally {
      const submitButton =
        form.querySelector('button[type="submit"]');

      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}

/* ------------------------------------------------------------------------
   Dynamic footer year
   ------------------------------------------------------------------------ */
function initFooterYear() {
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
