// Top-level tabs logic
(function(){
  const topTabs = Array.from(document.querySelectorAll('nav.top-tabs [role="tab"]'));
  const panels = Array.from(document.querySelectorAll('.subject-panel'));

  function activateTopTab(tab){
    topTabs.forEach(t=>{
      t.setAttribute('aria-selected','false');
      t.setAttribute('tabindex','-1');
    });
    panels.forEach(p=>{
      p.setAttribute('aria-hidden','true');
    });

    tab.setAttribute('aria-selected','true');
    tab.setAttribute('tabindex','0');
    const target = tab.dataset.target;
    const panel = document.getElementById('panel-' + target);
    if(panel){
      panel.setAttribute('aria-hidden','false');
      // If the panel contains an inner tablist, activate its first tab (languages -> first language)
      const firstInner = panel.querySelector('[role="tablist"] [role="tab"]');
      if(firstInner) firstInner.click();
    }
    tab.focus();
  }

  topTabs.forEach(tab=>{
    tab.addEventListener('click', ()=> activateTopTab(tab));
    tab.addEventListener('keydown', (e)=>{
      const idx = topTabs.indexOf(tab);
      if(e.key === 'ArrowRight'){
        const next = topTabs[(idx+1)%topTabs.length];
        next.click();
      } else if(e.key === 'ArrowLeft'){
        const prev = topTabs[(idx-1+topTabs.length)%topTabs.length];
        prev.click();
      } else if(e.key === 'Home'){
        topTabs[0].click();
      } else if(e.key === 'End'){
        topTabs[topTabs.length-1].click();
      }
    });
  });

  // Initialize: ensure Home active
  const initial = document.querySelector('nav.top-tabs [aria-selected="true"]');
  if(initial) initial.click();
})();

// Inner tabs logic (works for language selector and subject inner tabs)
(function(){
  document.addEventListener('click', function(e){
    const btn = e.target.closest('[role="tab"][data-panel]');
    if(!btn) return;
    const tablist = btn.closest('[role="tablist"]');
    if(!tablist) return;

    // deactivate siblings
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    tabs.forEach(t=>{
      t.setAttribute('aria-selected','false');
      t.setAttribute('tabindex','-1');
    });

    // hide panels within the same subject-card (or languages card)
    const subjectCard = tablist.closest('.subject-card, .language-panel');
    if(subjectCard){
      const panels = Array.from(subjectCard.querySelectorAll('[role="tabpanel"]'));
      panels.forEach(p=>{
        p.hidden = true;
      });
    }

    // activate clicked
    btn.setAttribute('aria-selected','true');
    btn.setAttribute('tabindex','0');
    const panelId = btn.dataset.panel;
    const panel = document.getElementById(panelId);
    if(panel) panel.hidden = false;

    // If the revealed panel contains its own tablist (nested inner tabs), activate its first tab
    if(panel){
      const nestedTablist = panel.querySelector('[role="tablist"]');
      if(nestedTablist){
        const nestedFirst = nestedTablist.querySelector('[role="tab"]');
        if(nestedFirst) nestedFirst.click();
      }
    }

    btn.focus();
  });

  // keyboard navigation for inner tabs
  document.addEventListener('keydown', function(e){
    const current = e.target.closest('[role="tab"][data-panel]');
    if(!current) return;
    const tablist = current.closest('[role="tablist"]');
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const idx = tabs.indexOf(current);

    if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){
      e.preventDefault();
      const next = tabs[(idx+1)%tabs.length];
      next.click();
    } else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
      e.preventDefault();
      const prev = tabs[(idx-1+tabs.length)%tabs.length];
      prev.click();
    } else if(e.key === 'Home'){
      e.preventDefault();
      tabs[0].click();
    } else if(e.key === 'End'){
      e.preventDefault();
      tabs[tabs.length-1].click();
    }
  });

  // On page load, ensure each subject-card's first inner tab is active (for accessibility)
  document.querySelectorAll('.subject-card').forEach(card=>{
    const firstTab = card.querySelector('[role="tablist"] [role="tab"]');
    if(firstTab) firstTab.click();
  });
})();
