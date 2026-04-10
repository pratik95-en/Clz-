// ===== TABS =====
function showTab(id) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  event.target.classList.add('active');
}

// ===== CHAPTER PROGRESS =====
function updateProgress() {
  const boxes = document.querySelectorAll('.chapter-check input[type="checkbox"]');
  const checked = document.querySelectorAll('.chapter-check input:checked').length;
  const total = boxes.length;
  const pct = total ? Math.round((checked / total) * 100) : 0;
  const bar = document.getElementById('chapterProgress');
  if (bar) {
    bar.style.width = pct + '%';
    bar.textContent = pct + '%';
  }
  // Save to localStorage
  const key = 'progress-' + window.location.pathname;
  const states = Array.from(boxes).map(b => b.checked);
  localStorage.setItem(key, JSON.stringify(states));
}

// Load saved progress
(function() {
  const key = 'progress-' + window.location.pathname;
  const saved = localStorage.getItem(key);
  if (saved) {
    const states = JSON.parse(saved);
    const boxes = document.querySelectorAll('.chapter-check input[type="checkbox"]');
    boxes.forEach((b, i) => { if (states[i]) b.checked = true; });
    updateProgress();
  }
})();

// ===== PDF SHOW =====
function showPDF(input) {
  if (input.files && input.files[0]) {
    const url = URL.createObjectURL(input.files[0]);
    const viewer = document.createElement('iframe');
    viewer.src = url;
    viewer.style.cssText = 'width:100%;height:600px;border:none;border-radius:12px;margin-top:1rem;';
    const tab = document.getElementById('tab-pdf');
    const existing = tab.querySelector('iframe');
    if (existing) existing.remove();
    tab.appendChild(viewer);
  }
}
