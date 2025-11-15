// Top-level tab switching
const topTabs = document.querySelectorAll('.top-tabs button');
const panels = document.querySelectorAll('.subject-panel');

topTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    topTabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    panels.forEach(p => p.classList.remove('active'));

    tab.setAttribute('aria-selected', 'true');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

// Inner tab switching (languages and subjects)
document.addEventListener('click', e => {
  const btn = e.target.closest('.inner-tabs button');
  if (!btn) return;

  const parent = btn.closest('.subject-card, .language-panel');
  const
