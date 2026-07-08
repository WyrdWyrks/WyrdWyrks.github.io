// WyrdWyrks — main.js

// Mobile nav hamburger
(function () {
  const btn = document.querySelector('.nav-menu-btn');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('open'));
  links.addEventListener('click', e => {
    if (e.target.tagName === 'A') links.classList.remove('open');
  });
})();

// 3D model toggle (Case/PCB)
(function () {
  const toggle = document.getElementById('model-toggle');
  const viewer = document.querySelector('model-viewer');
  if (!toggle || !viewer) return;

  const models = {
    case: '../assets/models/V3-Mechanical.glb',
    pcb: '../assets/models/V3-PCB-fast-preview.glb'
  };

  toggle.addEventListener('change', () => {
    viewer.src = toggle.checked ? models.case : models.pcb;
  });
})();

// Active nav link
(function () {
  const links = document.querySelectorAll('.nav-links a');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });
})();

// Glitch effect on hero title
(function () {
  const title = document.querySelector('.hero h1');
  if (!title) return;

  let timeout;
  function glitch() {
    title.classList.add('glitch');
    setTimeout(() => title.classList.remove('glitch'), 200);
    timeout = setTimeout(glitch, 3000 + Math.random() * 4000);
  }
  timeout = setTimeout(glitch, 2000);
})();

// Typed terminal line in hero
(function () {
  const el = document.querySelector('.hero-sub');
  if (!el) return;

  const text = el.textContent;
  el.textContent = '';
  el.style.borderRight = '2px solid #ff6a00';
  let i = 0;

  function type() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, 35 + Math.random() * 25);
    } else {
      // blink cursor then remove
      let blinks = 0;
      const blink = setInterval(() => {
        el.style.borderRight = blinks % 2 === 0 ? 'none' : '2px solid #ff6a00';
        if (++blinks > 6) { clearInterval(blink); el.style.borderRight = 'none'; }
      }, 400);
    }
  }

  // Start after a short delay
  setTimeout(type, 300);
})();

// Gallery lightbox
(function () {
  const thumbs = Array.from(document.querySelectorAll('.gallery-thumb'));
  const lightbox = document.getElementById('gallery-lightbox');
  if (!thumbs.length || !lightbox) return;

  const lightboxImg = document.getElementById('gallery-lightbox-img');
  const lightboxCaption = document.getElementById('gallery-lightbox-caption');
  const closeBtn = document.getElementById('gallery-lightbox-close');
  const prevBtn = document.getElementById('gallery-lightbox-prev');
  const nextBtn = document.getElementById('gallery-lightbox-next');

  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + thumbs.length) % thumbs.length;
    const img = thumbs[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = thumbs[currentIndex].dataset.caption || '';
    lightbox.hidden = false;
  }

  function close() {
    lightbox.hidden = true;
    lightboxImg.src = '';
  }

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => show(index));
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => show(currentIndex - 1));
  nextBtn.addEventListener('click', () => show(currentIndex + 1));

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', e => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
    if (e.key === 'ArrowRight') show(currentIndex + 1);
  });
})();
