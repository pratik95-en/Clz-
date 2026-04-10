// ===== THEME TOGGLE =====
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? '' : 'dark');
  document.querySelector('.theme-toggle').textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('shastri-theme', isDark ? 'light' : 'dark');
}

// Load saved theme
(function() {
  const saved = localStorage.getItem('shastri-theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = '☀️';
  }
})();

// ===== LANGUAGE TOGGLE =====
function toggleLang(lang) {
  document.querySelectorAll('[data-ne]').forEach(el => {
    el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ne');
  });
  localStorage.setItem('shastri-lang', lang);
}

// Load saved language
(function() {
  const saved = localStorage.getItem('shastri-lang');
  if (saved) {
    const sel = document.querySelector('.lang-toggle');
    if (sel) { sel.value = saved; toggleLang(saved); }
  }
})();

// ===== SEARCH =====
const allSubjects = [
  { name: 'नेपाली (अनिवार्य)', url: 'year1/nepali/index.html', year: 'प्रथम वर्ष' },
  { name: 'अ नेपाली', url: 'year1/nepali/a-nepali.html', year: 'प्रथम वर्ष' },
  { name: 'ख नेपाली', url: 'year1/nepali/kha-nepali.html', year: 'प्रथम वर्ष' },
  { name: 'Compulsory English', url: 'year1/english/compulsory.html', year: 'प्रथम वर्ष' },
  { name: 'Major English 1', url: 'year1/english/major1.html', year: 'प्रथम वर्ष' },
  { name: 'Major English 2', url: 'year1/english/major2.html', year: 'प्रथम वर्ष' },
  { name: 'Jyotish 1', url: 'year1/jyotish/jyotish1.html', year: 'प्रथम वर्ष' },
  { name: 'Jyotish 2', url: 'year1/jyotish/jyotish2.html', year: 'प्रथम वर्ष' },
  { name: 'व्याकरण १', url: 'year1/vyakaran/vyakaran1.html', year: 'प्रथम वर्ष' },
  { name: 'व्याकरण २', url: 'year1/vyakaran/vyakaran2.html', year: 'प्रथम वर्ष' },
];

function searchSubject() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  const overlay = document.getElementById('searchOverlay');
  const results = document.getElementById('searchResults');

  if (!q) { overlay.style.display = 'none'; return; }

  const matched = allSubjects.filter(s =>
    s.name.toLowerCase().includes(q) || s.year.toLowerCase().includes(q)
  );

  if (matched.length === 0) {
    results.innerHTML = '<p style="padding:1rem;color:#888;">कुनै विषय फेला परेन।</p>';
  } else {
    results.innerHTML = matched.map(s => `
      <div class="search-result-item" onclick="window.location.href='${s.url}'">
        <strong>${s.name}</strong>
        <span style="float:right;font-size:0.85rem;color:#888;">${s.year}</span>
      </div>
    `).join('');
  }
  overlay.style.display = 'flex';
}

// Close search overlay on background click
document.addEventListener('click', function(e) {
  const overlay = document.getElementById('searchOverlay');
  if (overlay && e.target === overlay) overlay.style.display = 'none';
});

// ===== SCROLL ANIMATION =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-aos]').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
