/* ============================================================
   showcase.js — Full Showcase Page Logic
   Handles: filter buttons, masonry grid render, lightbox
   ============================================================ */

(function () {

  const grid       = document.getElementById('showcaseGrid');
  const filterBar  = document.getElementById('filterBar');
  const emptyState = document.getElementById('empty-state');
  const lightbox   = document.getElementById('lightbox');
  const lbMedia    = document.getElementById('lightbox-media');
  const lbCaption  = document.getElementById('lightbox-caption');

  if (!grid) return; // Only run on showcase.html

  let activeFilter  = 'all';
  let lightboxIndex = 0;
  let visibleItems  = [];

  // ── Build Filter Buttons ────────────────────────────────
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat.id === 'all' ? ' active' : '');
    btn.textContent = cat.label;
    btn.dataset.cat = cat.id;
    btn.addEventListener('click', () => setFilter(cat.id));
    filterBar.appendChild(btn);
  });

  // ── Render All Items ────────────────────────────────────
  SHOWCASE_ITEMS.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = `showcase-item`;
    el.dataset.cat   = item.category;
    el.dataset.index = index;

    if (item.type === 'video') {
      el.innerHTML = `
        <video src="${item.src}" poster="${item.thumb || ''}"
               muted loop playsinline preload="none"></video>
        <div class="play-badge">▶</div>
        <div class="item-overlay">
          <div class="item-cat">${item.category}</div>
          <div class="item-title">${item.title}</div>
        </div>`;
      el.addEventListener('mouseenter', () => el.querySelector('video').play());
      el.addEventListener('mouseleave', () => el.querySelector('video').pause());
    } else {
      el.innerHTML = `
        <img src="${item.src}" alt="${item.title}" loading="lazy"
             onerror="this.closest('.showcase-item').classList.add('no-img')"/>
        <div class="item-overlay">
          <div class="item-cat">${item.category}</div>
          <div class="item-title">${item.title}</div>
        </div>`;
    }

    el.addEventListener('click', () => openLightbox(index));
    grid.appendChild(el);
  });

  // ── Filter Logic ────────────────────────────────────────
  function setFilter(cat) {
    activeFilter = cat;

    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === cat);
    });

    // Show/hide items
    const all = grid.querySelectorAll('.showcase-item');
    visibleItems = [];

    all.forEach(el => {
      const match = cat === 'all' || el.dataset.cat === cat;
      el.classList.toggle('hidden', !match);
      if (match) visibleItems.push(parseInt(el.dataset.index));
    });

    emptyState.style.display = visibleItems.length === 0 ? 'block' : 'none';
  }

  // Initialize visible items
  visibleItems = SHOWCASE_ITEMS.map((_, i) => i);

  // ── Lightbox ────────────────────────────────────────────
  function openLightbox(itemIndex) {
    lightboxIndex = visibleItems.indexOf(itemIndex);
    if (lightboxIndex === -1) lightboxIndex = 0;
    renderLightboxMedia();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    // Stop any playing videos
    const vid = lbMedia.querySelector('video');
    if (vid) vid.pause();
  }

  function renderLightboxMedia() {
    const item = SHOWCASE_ITEMS[visibleItems[lightboxIndex]];
    if (!item) return;

    if (item.type === 'video') {
      lbMedia.innerHTML = `
        <video src="${item.src}" controls autoplay
               style="max-width:90vw;max-height:80vh;border-radius:10px;"></video>`;
    } else {
      lbMedia.innerHTML = `
        <img src="${item.src}" alt="${item.title}"
             style="max-width:90vw;max-height:80vh;border-radius:10px;object-fit:contain;"/>`;
    }
    lbCaption.textContent = item.title + ' — ' + item.category;
  }

  function prevItem() {
    const vid = lbMedia.querySelector('video');
    if (vid) vid.pause();
    lightboxIndex = (lightboxIndex - 1 + visibleItems.length) % visibleItems.length;
    renderLightboxMedia();
  }

  function nextItem() {
    const vid = lbMedia.querySelector('video');
    if (vid) vid.pause();
    lightboxIndex = (lightboxIndex + 1) % visibleItems.length;
    renderLightboxMedia();
  }

  // Event listeners
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', prevItem);
  document.getElementById('lightbox-next').addEventListener('click', nextItem);

  // Click outside to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowRight') nextItem();
    if (e.key === 'ArrowLeft')  prevItem();
    if (e.key === 'Escape')     closeLightbox();
  });

})();