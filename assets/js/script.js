/**
 * ELSAYED ASHRAF PORTFOLIO — script.js
 * Features: scroll reveal, active nav, theme toggle,
 * hamburger menu, animated counters, skill bars,
 * contact form, back to top
 */

(function () {
  "use strict";

  /* =====================================================
     THEME TOGGLE
     ===================================================== */
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Load saved theme or default dark
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  body.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const current = body.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
  });

  /* =====================================================
     NAVBAR — sticky + active section highlight
     ===================================================== */
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Scrolled class for shadow
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    highlightActiveSection();
    toggleBackToTop();
  }, { passive: true });

  function highlightActiveSection() {
    let currentId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }

  // Smooth scroll for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          // Close mobile menu if open
          navLinksContainer.classList.remove("open");
          hamburger.classList.remove("open");
          hamburger.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  /* =====================================================
     HAMBURGER MENU
     ===================================================== */
  const hamburger = document.getElementById("hamburger");
  const navLinksContainer = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    const isOpen = navLinksContainer.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      navLinksContainer.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });

  /* =====================================================
     SCROLL REVEAL (Intersection Observer)
     ===================================================== */
  const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Once revealed, unobserve for performance
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* =====================================================
     ANIMATED SKILL BARS (trigger on visibility)
     ===================================================== */
  const skillFills = document.querySelectorAll(".skill-fill");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const targetWidth = fill.getAttribute("data-width");
          // Small delay for stagger feel
          setTimeout(() => {
            fill.style.width = targetWidth + "%";
          }, 200);
          skillObserver.unobserve(fill);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillFills.forEach((fill) => skillObserver.observe(fill));

  /* =====================================================
     ANIMATED COUNTERS (Hero stats)
     ===================================================== */
  const counters = document.querySelectorAll("[data-count]");
  let countersStarted = false;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(eased * target);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(update);
  }

  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          // Small delay after hero loads
          setTimeout(() => {
            counters.forEach((counter) => animateCounter(counter));
          }, 600);
          heroObserver.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroSection = document.getElementById("hero");
  if (heroSection) heroObserver.observe(heroSection);

  /* =====================================================
     BACK TO TOP BUTTON
     ===================================================== */
  const backToTop = document.getElementById("back-to-top");

  function toggleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* =====================================================
     CONTACT FORM (client-side validation + mailto)
     ===================================================== */
  const contactForm = document.getElementById("contact-form");
  const formNote = document.getElementById("form-note");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Basic validation
      if (!name || !email || !message) {
        formNote.textContent = "Please fill in all fields.";
        formNote.style.color = "#f87171";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formNote.textContent = "Please enter a valid email address.";
        formNote.style.color = "#f87171";
        return;
      }

      // Compose mailto link
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );
      window.location.href = `mailto:sayedworkacc@gmail.com?subject=${subject}&body=${body}`;

      formNote.textContent = "✓ Opening your email client...";
      formNote.style.color = "var(--accent)";

      // Reset form after short delay
      setTimeout(() => {
        contactForm.reset();
        formNote.textContent = "";
      }, 3000);
    });
  }

  /* =====================================================
     HERO LOGO / TITLE STAGGER ANIMATION (CSS-driven)
     ===================================================== */
  // Trigger hero reveals immediately (don't wait for scroll)
  const heroReveals = document.querySelectorAll(".hero .reveal");
  heroReveals.forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), 100 + i * 150);
  });

  /* =====================================================
     SUBTLE PARALLAX on hero glows (mouse move)
     ===================================================== */
  const heroSection2 = document.getElementById("hero");
  if (heroSection2) {
    heroSection2.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xRatio = (clientX / innerWidth - 0.5) * 2;
      const yRatio = (clientY / innerHeight - 0.5) * 2;

      const glow1 = heroSection2.querySelector(".glow-1");
      const glow2 = heroSection2.querySelector(".glow-2");

      if (glow1) {
        glow1.style.transform = `translate(${xRatio * 15}px, ${yRatio * 10}px)`;
      }
      if (glow2) {
        glow2.style.transform = `translate(${-xRatio * 10}px, ${-yRatio * 8}px)`;
      }
    });
  }

  /* =====================================================
     TYPING CURSOR EFFECT on terminal card
     ===================================================== */
  const terminalCode = document.querySelector(".terminal-code");
  if (terminalCode) {
    const originalHTML = terminalCode.innerHTML;
    const cursor = document.createElement("span");
    cursor.style.cssText =
      "display:inline-block;width:8px;height:14px;background:var(--accent);vertical-align:middle;margin-left:2px;animation:blink 1s step-end infinite;";
    terminalCode.appendChild(cursor);
  }

  /* =====================================================
     SMOOTH ANCHOR SCROLL (for buttons in hero)
     ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  /* =====================================================
     ACCESSIBILITY: ESC closes mobile menu
     ===================================================== */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navLinksContainer.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });

  /* =====================================================
     PREFERS REDUCED MOTION — disable animations
     ===================================================== */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.style.setProperty("--ease-out", "linear");
    // Mark all reveals as immediately visible
    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => {
      el.style.transition = "none";
      el.classList.add("visible");
    });
    document.querySelectorAll(".skill-fill").forEach((fill) => {
      fill.style.transition = "none";
      fill.style.width = fill.getAttribute("data-width") + "%";
    });
  }

})();
