// DYNAMIC VIEW ROUTER & MODULE LOADER
async function switchView(viewName) {
    const container = document.getElementById('view-container');
    if (!container) return;

    try {
        // Fetch the individual view template file from the /views/ directory
        const response = await fetch(`views/${viewName}.html`);
        if (!response.ok) throw new Error(`Failed to load views/${viewName}.html`);
        const html = await response.text();
        container.innerHTML = html;
    } catch (err) {
        console.warn("Fetch fallback triggered (CORS or local file protocol restriction):", err);
        // Fallback: If running locally via file:// where fetch might be restricted, check if fallback element exists
        document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
        const fallbackEl = document.getElementById(`view-${viewName}`);
        if (fallbackEl) fallbackEl.classList.remove('hidden');
    }

    // Update browser URL hash and breadcrumb path indicator
    window.location.hash = viewName;
    const breadcrumb = document.getElementById('breadcrumbPath');
    if (breadcrumb) breadcrumb.innerText = `/views/${viewName}.html`;

    // Update active state styling on navigation buttons
    document.querySelectorAll('nav button').forEach(btn => {
        btn.className = "px-3 py-2 text-xs font-semibold rounded-lg transition-colors text-slate-700 hover:text-brand-600 hover:bg-slate-100";
    });
    const activeBtn = document.getElementById(`nav-btn-${viewName}`);
    if (activeBtn) {
        activeBtn.className = "px-3 py-2 text-xs font-semibold rounded-lg transition-colors text-brand-700 bg-brand-50";
    }

    // Trigger module-specific initialization scripts when views are loaded
    if (viewName === 'officials' && typeof initClockAndShift === 'function') {
        initClockAndShift();
    }
    if (viewName === 'forms' && typeof initDates === 'function') {
        initDates();
    }
    if (viewName === 'events') {
        if (typeof renderTodaySchedule === 'function') renderTodaySchedule();
        if (typeof renderCalendar === 'function') renderCalendar();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// LISTEN TO BROWSER NAVIGATION (BACK / FORWARD / HASH CHANGES)
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        switchView(hash);
    } else {
        switchView('overview');
    }
});

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        switchView(hash);
    }
});