const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const effectsBtn = document.getElementById("effectsBtn");
const body = document.body;
const cursorRing = document.getElementById("cursorRing");

// Mobile menu
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// Visual effects toggle
effectsBtn.addEventListener("click", () => {
  body.classList.toggle("effects-off");
  effectsBtn.textContent = body.classList.contains("effects-off") ? "○" : "✦";
});

// Stars
const stars = document.getElementById("stars");

for (let i = 0; i < 85; i++) {
  const star = document.createElement("span");
  star.className = "star" + (i % 5 === 0 ? " blue" : "");
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = (Math.random() * 8) + "s";
  star.style.opacity = (0.2 + Math.random() * 0.6).toFixed(2);
  stars.appendChild(star);
}

// Cursor
document.addEventListener("mousemove", (e) => {
  cursorRing.style.left = e.clientX + "px";
  cursorRing.style.top = e.clientY + "px";
});

document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursorRing.style.width = "38px";
    cursorRing.style.height = "38px";
  });

  el.addEventListener("mouseleave", () => {
    cursorRing.style.width = "24px";
    cursorRing.style.height = "24px";
  });
});

// Active nav
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + entry.target.id
        );
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(section => observer.observe(section));

// Reveal animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => {
  revealObserver.observe(el);
});

// Contact form
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const subject = form.elements.subject.value.trim();
  const message = form.elements.message.value.trim();

  const mailto =
    "mailto:janarthanm95@gmail.com" +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(
      "Name: " + name +
      "\nEmail: " + email +
      "\n\n" + message
    );

  window.location.href = mailto;
  formNote.textContent = "Opening your email application...";
});
