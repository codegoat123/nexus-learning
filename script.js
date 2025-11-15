// Top-level tab switching
const topTabs = document.querySelectorAll('.top-tabs button');
const subjectPanels = document.querySelectorAll('.subject-panel');

topTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // deactivate all
    topTabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    subjectPanels.forEach(p => p.classList.remove('active'));

    // activate clicked
    tab.setAttribute('aria-selected', 'true');
    const targetId = tab.dataset.target;
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  });
});

// Inner tab switching (for languages and subjects)
document.addEventListener('click', e => {
  const btn = e.target.closest('.inner-tabs button');
  if (!btn) return;

  const tablist = btn.closest('.inner-tabs');
  const parentPanel = btn.closest('.language-panel, .subject-card');

  // deactivate siblings
  tablist.querySelectorAll('button').forEach(t => t.setAttribute('aria-selected', 'false'));
  parentPanel.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));

  // activate clicked
  btn.setAttribute('aria-selected', 'true');
  const targetId = btn.dataset.panel;
  const targetPanel = document.getElementById(targetId);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }
});
