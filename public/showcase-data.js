/* ============================================================
   showcase-data.js — Your Creative Work Gallery
   ============================================================
   ADD YOUR OWN WORK HERE:

   Each item has:
     id       — unique string
     type     — 'image' or 'video'
     src      — file path (put files in public/showcase/)
     thumb    — thumbnail for videos (put in public/showcase/)
     title    — name shown on hover
     category — 'art' | 'model' | 'game' | 'web' | 'other'
     size     — 'small' | 'medium' | 'large' | 'wide' | 'tall'
                (controls the masonry grid sizing)

   EXAMPLE to add your own image:
   1. Put yourimage.jpg in public/showcase/
   2. Add this object to the array:
      { id:'my-art-1', type:'image', src:'showcase/yourimage.jpg',
        title:'My Drawing', category:'art', size:'medium' }
   ============================================================ */

const SHOWCASE_ITEMS = [

  // ── PLACEHOLDER items — replace with your real work ──────
  {
    id: 'art-1',
    type: 'image',
    src: 'showcase/placeholder-art-1.jpg',
    title: 'Character Concept Art',
    category: 'art',
    size: 'tall',
  },
  {
    id: 'model-1',
    type: 'image',
    src: 'showcase/placeholder-model-1.jpg',
    title: 'Sci-Fi Helmet — Blender Render',
    category: 'model',
    size: 'large',
  },
  {
    id: 'game-1',
    type: 'image',
    src: 'showcase/placeholder-game-1.jpg',
    title: 'Neon Abyss — Gameplay Screenshot',
    category: 'game',
    size: 'wide',
  },
  {
    id: 'art-2',
    type: 'image',
    src: 'showcase/placeholder-art-2.jpg',
    title: 'Environment Sketch',
    category: 'art',
    size: 'medium',
  },
  {
    id: 'model-2',
    type: 'image',
    src: 'showcase/placeholder-model-2.jpg',
    title: 'Low-poly Character — Turntable',
    category: 'model',
    size: 'small',
  },
  {
    id: 'game-2',
    type: 'video',
    src: 'showcase/placeholder-gameplay.mp4',
    thumb: 'showcase/placeholder-game-2.jpg',
    title: 'Pixel Farm — Gameplay Clip',
    category: 'game',
    size: 'wide',
  },
  {
    id: 'art-3',
    type: 'image',
    src: 'showcase/placeholder-art-3.jpg',
    title: 'Creature Design',
    category: 'art',
    size: 'small',
  },
  {
    id: 'web-1',
    type: 'image',
    src: 'showcase/placeholder-web-1.jpg',
    title: 'DevDash UI Design',
    category: 'web',
    size: 'medium',
  },
  {
    id: 'model-3',
    type: 'image',
    src: 'showcase/placeholder-model-3.jpg',
    title: 'Environment Scene — Blender',
    category: 'model',
    size: 'tall',
  },
  {
    id: 'art-4',
    type: 'image',
    src: 'showcase/placeholder-art-4.jpg',
    title: 'Ink Study',
    category: 'art',
    size: 'medium',
  },

];

/* ── Category labels for filters ──────────────────────────── */
const CATEGORIES = [
  { id: 'all',   label: 'All' },
  { id: 'art',   label: 'Art & Drawing' },
  { id: 'model', label: '3D Models' },
  { id: 'game',  label: 'Game Dev' },
  { id: 'web',   label: 'Web Dev' },
  { id: 'other', label: 'Other' },
];

/* ── Render peek grid on index.html ──────────────────────── */
(function renderPeekGrid() {
  const grid = document.getElementById('showcasePeekGrid');
  if (!grid) return;

  // Show first 8 items as a peek
  const peekItems = SHOWCASE_ITEMS.slice(0, 8);

  peekItems.forEach(item => {
    const el = document.createElement('div');
    el.className = `peek-item peek-${item.size} peek-cat-${item.category}`;

    if (item.type === 'video') {
      el.innerHTML = `
        <div class="peek-media-wrap">
          <video src="${item.src}" poster="${item.thumb || ''}"
                 muted loop playsinline preload="none"
                 class="peek-media"></video>
          <div class="peek-play-icon">▶</div>
          <div class="peek-overlay">
            <span class="peek-cat-tag">${item.category}</span>
            <span class="peek-title">${item.title}</span>
          </div>
        </div>`;
      // Play on hover
      el.addEventListener('mouseenter', () => el.querySelector('video').play());
      el.addEventListener('mouseleave', () => el.querySelector('video').pause());
    } else {
      el.innerHTML = `
        <div class="peek-media-wrap">
          <img src="${item.src}" alt="${item.title}" class="peek-media"
               loading="lazy" onerror="this.parentElement.parentElement.classList.add('peek-placeholder')"/>
          <div class="peek-overlay">
            <span class="peek-cat-tag">${item.category}</span>
            <span class="peek-title">${item.title}</span>
          </div>
        </div>`;
    }

    grid.appendChild(el);
  });
})();