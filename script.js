// ===== PHOTO FALLBACK =====
const heroPhoto = document.getElementById('heroPhoto');
const photoFallback = document.getElementById('photoFallback');
if (heroPhoto) {
  heroPhoto.addEventListener('error', () => {
    heroPhoto.style.display = 'none';
    photoFallback.style.display = 'flex';
  });
}

// ===== MATRIX RAIN =====
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ@#$%';
const fontSize = 14;
let cols = Math.floor(canvas.width / fontSize);
let drops = Array(cols).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(5,10,14,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff88';
  ctx.font = fontSize + 'px Share Tech Mono';
  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, y * fontSize);
    if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cols = Math.floor(canvas.width / fontSize);
  drops = Array(cols).fill(1);
});

// ===== TYPED EFFECT =====
const phrases = [
  'whoami',
  'echo "Hello, World!"',
  'git push origin main',
  'npm run deploy',
  'sudo make portfolio'
];
let pIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');

function typeLoop() {
  const phrase = phrases[pIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, cIdx++);
    if (cIdx > phrase.length) { deleting = true; setTimeout(typeLoop, 2000); return; }
  } else {
    typedEl.textContent = phrase.slice(0, cIdx--);
    if (cIdx < 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; cIdx = 0; }
  }
  setTimeout(typeLoop, deleting ? 50 : 90);
}
typeLoop();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('section, .project-card, .skill-category, .workflow-step');
reveals.forEach(el => el.classList.add('reveal'));
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ===== CONTACT FORM =====
// ⚠️  REPLACE the URL below with your Render.com backend URL after deployment
const BACKEND_URL = 'https://your-backend.onrender.com/api/contact';

const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  btnText.textContent = 'Sending...';
  submitBtn.disabled = true;
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  try {
    const res = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    if (res.ok) {
      formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
      formStatus.className = 'form-status success';
      form.reset();
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    formStatus.textContent = '✗ Could not send message. Please email me directly.';
    formStatus.className = 'form-status error';
  } finally {
    btnText.textContent = 'Send Message →';
    submitBtn.disabled = false;
  }
});
