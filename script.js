// ===========================
// MOBILE MENU
// ===========================
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ===========================
// STATS COUNTER ANIMATION
// ===========================
function animateCounter(el) {
  const target = parseInt(el.textContent.replace(/\D/g, ""), 10);
  const suffix = el.textContent.replace(/[\d]/g, "");
  let current = 0;
  const duration = 1400;
  const step = Math.ceil(target / (duration / 16));

  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target
          .querySelectorAll(".stat-number")
          .forEach(animateCounter);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

const statsBar = document.querySelector(".stats-bar");
if (statsBar) statsObserver.observe(statsBar);

// ===========================
// SCROLL REVEAL
// ===========================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

document
  .querySelectorAll(".card, .step, .testimonial, .faq-item, .stat, .tl-item, .gallery-tile, .leilao-card, .leilao-info")
  .forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });

// ===========================
// COUNTDOWN TIMER
// ===========================
const countdownEl = document.getElementById("countdown");
if (countdownEl) {
  const targetDate = new Date(2026, 7, 15, 10, 0, 0).getTime();
  const daysEl  = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl  = document.getElementById("cd-mins");
  const secsEl  = document.getElementById("cd-secs");

  function updateCountdown() {
    const now  = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = hoursEl.textContent = minsEl.textContent = secsEl.textContent = "00";
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const secs  = Math.floor((diff % 60000) / 1000);

    daysEl.textContent  = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent  = String(mins).padStart(2, "0");
    secsEl.textContent  = String(secs).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ===========================
// LIVE COUNTDOWN
// ===========================
const liveCountdown = document.getElementById("countdown-live");
if (liveCountdown) {
  const liveTarget = new Date(2026, 5, 21, 20, 0, 0).getTime();
  const liveDays  = document.getElementById("live-days");
  const liveHours = document.getElementById("live-hours");
  const liveMins  = document.getElementById("live-mins");
  const liveSecs  = document.getElementById("live-secs");

  function updateLive() {
    const diff = liveTarget - Date.now();
    if (diff <= 0) {
      liveDays.textContent = liveHours.textContent = liveMins.textContent = liveSecs.textContent = "00";
      return;
    }
    liveDays.textContent  = String(Math.floor(diff / 86400000)).padStart(2, "0");
    liveHours.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0");
    liveMins.textContent  = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    liveSecs.textContent  = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  }

  updateLive();
  setInterval(updateLive, 1000);
}

// ===========================
// ACTIVE NAV LINK
// ===========================
const sections = document.querySelectorAll("section[id], footer[id]");
const navLinks = document.querySelectorAll(".nav a");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "nav-active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  },
  { threshold: 0.3, rootMargin: "-72px 0px 0px 0px" }
);

sections.forEach((s) => navObserver.observe(s));
