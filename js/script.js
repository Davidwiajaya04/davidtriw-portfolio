/* =============================================
   THEME TOGGLE
============================================= */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark-mode';
html.classList.add(currentTheme);
updateThemeIcon();

function updateThemeIcon() {
  const isDark = html.classList.contains('dark-mode');
  themeIcon.textContent = isDark ? '🌙' : '☀️';
}

themeToggle.addEventListener('click', () => {
  if (html.classList.contains('dark-mode')) {
    html.classList.remove('dark-mode');
    html.classList.add('light-mode');
    localStorage.setItem('theme', 'light-mode');
  } else {
    html.classList.remove('light-mode');
    html.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark-mode');
  }
  updateThemeIcon();
});

/* =============================================
   SMOOTH SCROLL HELPER
============================================= */
function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navH = document.getElementById('navbar').offsetHeight;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - navH,
    behavior: 'smooth'
  });
}

/* =============================================
   NAVBAR SCROLL EFFECT
============================================= */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActive();
});

/* =============================================
   ACTIVE NAV STATE
============================================= */
function updateActive() {
  const secs = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  let cur = 'hero';
  
  secs.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) cur = s.id;
  });
  
  links.forEach(l => {
    const fn = l.getAttribute('onclick') || '';
    const hit = fn.includes("'" + cur + "'");
    l.classList.toggle('active', hit && !l.classList.contains('nav-cta'));
  });
}

/* =============================================
   MOBILE MENU
============================================= */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const o = mobileMenu.classList.toggle('open');
  const s = hamburger.querySelectorAll('span');
  s[0].style.transform = o ? 'rotate(45deg) translate(5px, 5px)' : '';
  s[1].style.opacity = o ? '0' : '';
  s[2].style.transform = o ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => {
    s.style.transform = '';
    s.style.opacity = '';
  });
}

/* =============================================
   REVEAL ON SCROLL
============================================= */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, {
  threshold: .1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* =============================================
   CONTACT FORM → MAILTO
============================================= */
function sendMessage() {
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim();
  const msg = document.getElementById('fmsg').value.trim();
  
  let err = false;
  
  const fields = [
    { id: 'fname', v: name },
    { id: 'femail', v: email },
    { id: 'fsubject', v: subject },
    { id: 'fmsg', v: msg }
  ];
  
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    if (!f.v) {
      el.style.borderColor = '#ff6b9d';
      el.style.boxShadow = '0 0 0 3px rgba(255,107,157,.12)';
      err = true;
      setTimeout(() => {
        el.style.borderColor = '';
        el.style.boxShadow = '';
      }, 2200);
    }
  });
  
  if (err) return;
  
  const to = 'wijayantodavid04@gmail.com';
  const sub = encodeURIComponent(subject || `Pesan dari ${name}`);
  const body = encodeURIComponent(`Halo, nama saya ${name}.\nEmail saya: ${email}\n\n${msg}`);
  
  window.location.href = `mailto:${to}?subject=${sub}&body=${body}`;
  
  const form = document.getElementById('contactForm');
  const succ = document.getElementById('formSuccess');
  
  form.style.transition = 'opacity .3s,transform .3s';
  form.style.opacity = '0';
  form.style.transform = 'translateY(-12px)';
  
  setTimeout(() => {
    form.style.display = 'none';
    succ.style.display = 'block';
    succ.style.opacity = '0';
    succ.style.transform = 'translateY(12px)';
    succ.style.transition = 'all .45s cubic-bezier(.4,0,.2,1)';
    requestAnimationFrame(() => {
      succ.style.opacity = '1';
      succ.style.transform = 'translateY(0)';
    });
  }, 350);
}

/* =============================================
   CURSOR GLOW (DESKTOP)
============================================= */
if (window.matchMedia('(pointer:fine)').matches) {
  const g = document.createElement('div');
  g.style.cssText = 'position:fixed;width:400px;height:400px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(124,111,255,.04) 0%,transparent 70%);transform:translate(-50%,-50%);transition:left .18s ease,top .18s ease;';
  document.body.appendChild(g);
  
  document.addEventListener('mousemove', e => {
    g.style.left = e.clientX + 'px';
    g.style.top = e.clientY + 'px';
  });
}

/* =============================================
   ORB PARALLAX
============================================= */
document.addEventListener('mousemove', e => {
  const orbs = document.querySelectorAll('.orb');
  const x = (e.clientX / window.innerWidth - .5) * 22;
  const y = (e.clientY / window.innerHeight - .5) * 22;
  
  orbs.forEach((o, i) => {
    const f = (i + 1) * .38;
    o.style.transform = `translate(${x * f}px, ${y * f}px)`;
  });
});
