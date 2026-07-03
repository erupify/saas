// ═══════════════════════════════════════════════════════════════
//  Erupify Dashboard — Main JS
//  Handles: auth guard, nav, charts, reviews CRUD, themes, settings
// ═══════════════════════════════════════════════════════════════

import { supabase } from '../supabase/client.js';

// ── Helpers ───────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ── Auth Guard ────────────────────────────────────────────────
async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = '../auth/login.html';
    return null;
  }
  return session;
}

// ── Topbar date ───────────────────────────────────────────────
function setTopbarDate() {
  const now = new Date();
  $('topbar-date').textContent = now.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  });
}

// ── Sidebar navigation ────────────────────────────────────────
const sectionTitles = {
  overview: 'Overview',
  reviews:  'Reviews',
  reports:  'Reports',
  themes:   'Themes',
  settings: 'Settings',
};

window.switchSection = function(name) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  $(`section-${name}`).classList.add('active');
  $(`nav-${name}`).classList.add('active');
  $('topbar-title').textContent = sectionTitles[name];
  closeSidebar();

  // Load data on first visit
  if (name === 'reviews')  loadAllReviews();
  if (name === 'reports')  renderReportCharts();
};

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => switchSection(btn.dataset.section));
});

// Mobile sidebar
$('mobile-toggle').addEventListener('click', () => {
  $('sidebar').classList.toggle('open');
  $('sidebar-overlay').classList.toggle('active');
});
$('sidebar-overlay').addEventListener('click', closeSidebar);
function closeSidebar() {
  $('sidebar').classList.remove('open');
  $('sidebar-overlay').classList.remove('active');
}

// ── Logout ────────────────────────────────────────────────────
$('logout-btn').addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.href = '../auth/login.html';
});

// ── Chart.js shared config ────────────────────────────────────
function getChartDefaults() {
  const style = getComputedStyle(document.documentElement);
  return {
    accent:     style.getPropertyValue('--accent').trim()      || '#FF9800',
    chart2:     style.getPropertyValue('--chart-2').trim()     || '#FF6B35',
    chart3:     style.getPropertyValue('--chart-3').trim()     || '#FFB74D',
    chart4:     style.getPropertyValue('--chart-4').trim()     || '#FFF176',
    textLight:  style.getPropertyValue('--text-light').trim()  || '#9CA3AF',
    border:     style.getPropertyValue('--border').trim()      || '#2E2E2E',
    surface2:   style.getPropertyValue('--surface-2').trim()   || '#212121',
    accentGlow: style.getPropertyValue('--accent-glow').trim() || 'rgba(255,152,0,0.2)',
  };
}

let lineChart, donutChart, barChart, hbarChart;

function buildCharts(reviews) {
  const c = getChartDefaults();

  // ── Prepare monthly data (last 6 months)
  const now   = new Date();
  const labels = [];
  const counts = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels.push(months[d.getMonth()]);
    const inMonth = reviews.filter(r => {
      const rd = new Date(r.review_date || r.created_at);
      return rd.getFullYear() === d.getFullYear() && rd.getMonth() === d.getMonth();
    }).length;
    counts.push(inMonth);
  }

  // ── Rating distribution
  const ratingDist = [1,2,3,4,5].map(n => reviews.filter(r => r.rating === n).length);

  const gridColor  = c.border;
  const tickColor  = c.textLight;
  const baseOpts   = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
      y: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } }, beginAtZero: true }
    }
  };

  // ── Line chart
  if (lineChart) lineChart.destroy();
  lineChart = new Chart($('line-chart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data: counts,
        borderColor: c.accent,
        backgroundColor: c.accentGlow,
        borderWidth: 2.5,
        pointBackgroundColor: c.accent,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      }]
    },
    options: { ...baseOpts }
  });

  // ── Donut chart
  if (donutChart) donutChart.destroy();
  donutChart = new Chart($('donut-chart'), {
    type: 'doughnut',
    data: {
      labels: ['1★','2★','3★','4★','5★'],
      datasets: [{
        data: ratingDist,
        backgroundColor: ['#EF4444','#F97316','#EAB308','#22C55E', c.accent],
        borderColor: 'transparent',
        borderWidth: 0,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: { color: tickColor, font: { size: 11 }, padding: 12, boxWidth: 10 }
        }
      }
    }
  });
}

function renderReportCharts() {
  // Use the cached reviews
  const reviews = window._cachedReviews || [];
  const c = getChartDefaults();
  const now = new Date();
  const gridColor = c.border;
  const tickColor = c.textLight;

  // 12-month bar
  const labels12 = [];
  const counts12 = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels12.push(months[d.getMonth()]);
    counts12.push(reviews.filter(r => {
      const rd = new Date(r.review_date || r.created_at);
      return rd.getFullYear() === d.getFullYear() && rd.getMonth() === d.getMonth();
    }).length);
  }

  // Rating horizontal bar
  const ratingDist = [5,4,3,2,1].map(n => reviews.filter(r => r.rating === n).length);

  if (barChart) barChart.destroy();
  barChart = new Chart($('bar-chart'), {
    type: 'bar',
    data: {
      labels: labels12,
      datasets: [{
        data: counts12,
        backgroundColor: c.accent,
        borderRadius: 6,
        hoverBackgroundColor: c.chart2,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 10 } } },
        y: { grid: { color: gridColor }, ticks: { color: tickColor }, beginAtZero: true }
      }
    }
  });

  if (hbarChart) hbarChart.destroy();
  hbarChart = new Chart($('hbar-chart'), {
    type: 'bar',
    data: {
      labels: ['5 ★','4 ★','3 ★','2 ★','1 ★'],
      datasets: [{
        data: ratingDist,
        backgroundColor: [c.accent, c.chart3, '#EAB308','#F97316','#EF4444'],
        borderRadius: 6,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: tickColor }, beginAtZero: true },
        y: { grid: { display: false }, ticks: { color: tickColor, font: { size: 12 } } }
      }
    }
  });
}

// ── Render reviews ────────────────────────────────────────────
function starsHtml(n) {
  return [...Array(5)].map((_,i) =>
    `<span class="${i < n ? 'star-filled' : 'star-empty'}" style="${i < n ? 'color:#FFB74D;' : 'color:#444;'}">★</span>`
  ).join('');
}

function renderRecentReviews(reviews) {
  const tbody = $('recent-reviews-body');
  const slice = reviews.slice(0, 5);
  if (!slice.length) {
    tbody.innerHTML = `<tr><td colspan="4">
      <div class="empty-state">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <p>No reviews yet. Add your first review!</p>
      </div>
    </td></tr>`;
    return;
  }
  tbody.innerHTML = slice.map(r => `
    <tr>
      <td class="reviewer-name">${escHtml(r.reviewer_name || 'Anonymous')}</td>
      <td>${starsHtml(r.rating)}</td>
      <td><span class="review-excerpt">${escHtml(r.review_text || '—')}</span></td>
      <td>${formatDate(r.review_date || r.created_at)}</td>
    </tr>
  `).join('');
}

function renderAllReviews(reviews) {
  const tbody = $('all-reviews-body');
  if (!reviews.length) {
    tbody.innerHTML = `<tr><td colspan="5">
      <div class="empty-state">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <p>No reviews match the selected filter.</p>
      </div>
    </td></tr>`;
    return;
  }
  tbody.innerHTML = reviews.map(r => `
    <tr>
      <td class="reviewer-name">${escHtml(r.reviewer_name || 'Anonymous')}</td>
      <td>${starsHtml(r.rating)}</td>
      <td><span class="review-excerpt">${escHtml(r.review_text || '—')}</span></td>
      <td style="color:var(--text-muted); font-size:13px;">${escHtml(r.source || 'google')}</td>
      <td>${formatDate(r.review_date || r.created_at)}</td>
    </tr>
  `).join('');
}

function loadAllReviews() {
  let filtered = [...(window._cachedReviews || [])];
  const ratingFilter = $('filter-rating').value;
  const periodFilter = parseInt($('filter-period').value);

  if (ratingFilter) filtered = filtered.filter(r => r.rating === parseInt(ratingFilter));
  if (periodFilter) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - periodFilter);
    filtered = filtered.filter(r => new Date(r.review_date || r.created_at) >= cutoff);
  }
  renderAllReviews(filtered);
}

$('filter-rating').addEventListener('change', loadAllReviews);
$('filter-period').addEventListener('change', loadAllReviews);

// ── KPI calculation ───────────────────────────────────────────
function updateKPIs(reviews) {
  const total = reviews.length;
  const avg   = total ? (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1) : '0.0';
  const now   = new Date();
  const thisMonth  = reviews.filter(r => {
    const d = new Date(r.review_date || r.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const lastMonthD = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonth  = reviews.filter(r => {
    const d = new Date(r.review_date || r.created_at);
    return d.getMonth() === lastMonthD.getMonth() && d.getFullYear() === lastMonthD.getFullYear();
  }).length;
  const growth = lastMonth > 0 ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100) : 0;

  // Overview KPIs
  animateNumber('kpi-total', total);
  $('kpi-avg').textContent   = avg + ' ★';
  animateNumber('kpi-month', thisMonth);
  $('kpi-growth').textContent = (growth >= 0 ? '+' : '') + growth + '%';

  const changeClass = growth >= 0 ? 'up' : 'down';
  $('kpi-total-change').className  = `kpi-change ${growth >= 0 ? 'up' : 'down'}`;
  $('kpi-month-change').className  = `kpi-change ${changeClass}`;
  $('kpi-growth-change').className = `kpi-change ${changeClass}`;
  $('kpi-month-change').innerHTML  = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
    <polyline points="${growth >= 0 ? '18 15 12 9 6 15' : '6 9 12 15 18 9'}"></polyline></svg>
    ${growth >= 0 ? '+' : ''}${growth}% vs last month`;

  // Report KPIs
  const fiveStars = reviews.filter(r => r.rating === 5).length;
  const satisfaction = total ? Math.round((reviews.filter(r => r.rating >= 4).length / total) * 100) : 0;
  const monthlyTotals = {};
  reviews.forEach(r => {
    const d = new Date(r.review_date || r.created_at);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    monthlyTotals[key] = (monthlyTotals[key] || 0) + 1;
  });
  const monthlyArr = Object.values(monthlyTotals);
  const bestMonthCount = monthlyArr.length ? Math.max(...monthlyArr) : 0;
  const avgPerMonth = monthlyArr.length ? Math.round(monthlyArr.reduce((a,b)=>a+b,0)/monthlyArr.length) : 0;

  if ($('rep-best-month'))    $('rep-best-month').textContent    = bestMonthCount;
  if ($('rep-avg-per-month')) $('rep-avg-per-month').textContent = avgPerMonth;
  if ($('rep-five-star'))     $('rep-five-star').textContent     = fiveStars;
  if ($('rep-satisfaction'))  $('rep-satisfaction').textContent  = satisfaction + '%';
}

function animateNumber(id, target) {
  const el = $(id);
  if (!el) return;
  let start = 0;
  const step = Math.ceil(target / 30);
  const interval = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start.toLocaleString();
    if (start >= target) clearInterval(interval);
  }, 30);
}

// ── Utilities ─────────────────────────────────────────────────
function escHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function formatDate(str) {
  if (!str) return '—';
  return new Date(str).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
}

// ── Add Review Modal ──────────────────────────────────────────
let currentUserId = null;

function openModal() {
  $('review-modal').style.display = 'flex';
  $('m-date').value = new Date().toISOString().split('T')[0];
}
function closeModal() { $('review-modal').style.display = 'none'; }

$('add-review-btn')?.addEventListener('click', openModal);
$('add-review-btn-2')?.addEventListener('click', openModal);
$('close-modal').addEventListener('click', closeModal);
$('review-modal').addEventListener('click', (e) => { if (e.target === $('review-modal')) closeModal(); });

$('save-review-btn').addEventListener('click', async () => {
  const name   = $('m-name').value.trim();
  const rating = parseInt($('m-rating').value);
  const text   = $('m-text').value.trim();
  const date   = $('m-date').value;

  if (!name) { alert('Please enter the reviewer name.'); return; }

  const { error } = await supabase.from('reviews').insert({
    user_id:       currentUserId,
    reviewer_name: name,
    rating,
    review_text:   text || null,
    review_date:   date || null,
    source:        'google'
  });

  if (error) { alert('Error saving review: ' + error.message); return; }

  closeModal();
  $('m-name').value = ''; $('m-text').value = '';
  await loadDashboardData();
  showSuccessToast('Review added successfully!');
});

// ── Success toast ─────────────────────────────────────────────
function showSuccessToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:9999;
    background:rgba(34,197,94,0.15); border:1px solid rgba(34,197,94,0.3);
    color:#86EFAC; padding:12px 20px; border-radius:12px;
    font-size:14px; font-weight:500; animation: fadeIn 0.3s ease;
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  `;
  t.textContent = '✓ ' + msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ── Export CSV ────────────────────────────────────────────────
$('export-csv-btn').addEventListener('click', () => {
  const reviews = window._cachedReviews || [];
  if (!reviews.length) { alert('No reviews to export.'); return; }

  const headers = ['Reviewer,Rating,Review,Source,Date'];
  const rows = reviews.map(r =>
    `"${r.reviewer_name}",${r.rating},"${(r.review_text || '').replace(/"/g,'""')}","${r.source}","${r.review_date || r.created_at}"`
  );
  const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv' });
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = `erupify-reviews-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
});

// ── Theme system ──────────────────────────────────────────────
let selectedTheme = 'dark-orange';

document.querySelectorAll('.theme-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedTheme = card.dataset.theme;
    document.documentElement.setAttribute('data-theme', selectedTheme);
    // Rebuild charts with new colors
    buildCharts(window._cachedReviews || []);
  });
});

$('save-theme-btn').addEventListener('click', async () => {
  const { error } = await supabase
    .from('profiles')
    .update({ theme: selectedTheme })
    .eq('id', currentUserId);

  if (error) { alert('Failed to save theme.'); return; }
  localStorage.setItem('erupify_theme', selectedTheme);
  showSuccessToast('Theme saved!');
});

// ── Settings ──────────────────────────────────────────────────
$('save-profile-btn').addEventListener('click', async () => {
  const businessName = $('s-business').value.trim();
  const placeId      = $('s-place-id').value.trim();

  const { error } = await supabase
    .from('profiles')
    .update({ business_name: businessName, google_place_id: placeId })
    .eq('id', currentUserId);

  if (error) { alert('Failed to save: ' + error.message); return; }
  $('user-business').textContent = businessName || 'Your Business';
  $('user-avatar').textContent   = (businessName[0] || 'E').toUpperCase();
  showSuccessToast('Profile saved!');
});

$('change-pass-btn').addEventListener('click', async () => {
  const newPass     = $('s-new-pass').value;
  const confirmPass = $('s-confirm-pass').value;

  if (!newPass || newPass.length < 8) { alert('Password must be at least 8 characters.'); return; }
  if (newPass !== confirmPass) { alert('Passwords do not match.'); return; }

  const { error } = await supabase.auth.updateUser({ password: newPass });
  if (error) { alert('Error: ' + error.message); return; }
  $('s-new-pass').value = ''; $('s-confirm-pass').value = '';
  showSuccessToast('Password updated!');
});

$('delete-account-btn').addEventListener('click', () => {
  if (confirm('⚠️ Are you sure you want to delete your account? This action is permanent.')) {
    alert('Please contact support to delete your account.');
  }
});

// ── Main data loader ──────────────────────────────────────────
async function loadDashboardData() {
  // Fetch reviews
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('user_id', currentUserId)
    .order('created_at', { ascending: false });

  if (error) { console.error('Reviews fetch error:', error); return; }

  window._cachedReviews = reviews || [];
  updateKPIs(reviews);
  renderRecentReviews(reviews);
  buildCharts(reviews);
}

// ── Load user profile ─────────────────────────────────────────
async function loadProfile(userId) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profile) {
    const name = profile.business_name || 'Your Business';
    $('user-business').textContent = name;
    $('user-avatar').textContent   = name[0].toUpperCase();
    $('user-plan').textContent     = (profile.plan || 'free').charAt(0).toUpperCase() + (profile.plan||'free').slice(1) + ' Plan';

    // Pre-fill settings
    $('s-business').value  = profile.business_name || '';
    $('s-place-id').value  = profile.google_place_id || '';

    // Apply saved theme
    const theme = profile.theme || localStorage.getItem('erupify_theme') || 'dark-orange';
    selectedTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-card').forEach(c => {
      c.classList.toggle('selected', c.dataset.theme === theme);
    });
  }
}

// ── Bootstrap ─────────────────────────────────────────────────
(async () => {
  const session = await requireAuth();
  if (!session) return;

  currentUserId = session.user.id;

  setTopbarDate();
  await loadProfile(currentUserId);
  await loadDashboardData();

  // Greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning!' : hour < 18 ? 'Good afternoon!' : 'Good evening!';
  $('section-overview').querySelector('.section-title').textContent = greeting + ' 👋';
})();
