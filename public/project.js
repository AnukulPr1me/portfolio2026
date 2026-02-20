/* ============================================================
   project.js — Project Detail Page Renderer
   Each project lives as a data object below.
   To add a new project: copy one object, change the id,
   then link to it from index.html as project.html?id=your-id
   ============================================================ */

const PROJECTS = {

  'neon-abyss': {
    title: 'Neon Abyss Prototype',
    type: 'Game Dev',
    typeClass: 'type-game',
    tagline: 'A neon-soaked roguelite where every run tells a different story.',
    description: `Neon Abyss is a procedurally generated roguelite built in Unity. 
      The game features physics-based melee and ranged combat, dynamic lighting via 
      custom HLSL shaders, and a dungeon generation system that guarantees balanced 
      but unpredictable layouts every run.`,
    meta: {
      Year: '2024',
      Engine: 'Unity 2022',
      Role: 'Solo Developer',
      Duration: '3 Months',
    },
    links: {
      'Play Demo': '#',
      'GitHub': '#',
    },
    features: [
      { icon: '🗺️', title: 'Procedural Generation', desc: 'BSP tree dungeon generation with guaranteed path connectivity and room variety.' },
      { icon: '⚔️', title: 'Physics Combat', desc: 'Rigidbody-based melee with hit-stop, knockback, and directional damage.' },
      { icon: '✨', title: 'Custom Shaders', desc: 'HLSL shader graph for neon glow, bloom, and scanline post-processing effects.' },
      { icon: '🎥', title: 'Cinemachine', desc: 'Dynamic camera with combat zoom, screen shake, and room transition cutscenes.' },
      { icon: '🔊', title: 'Adaptive Audio', desc: 'Music intensity scales dynamically with enemy density and player health.' },
      { icon: '📊', title: 'Run Stats', desc: 'Per-run analytics tracking kills, damage dealt, items collected, and time.' },
    ],
    stack: ['Unity 2022', 'C#', 'HLSL', 'Cinemachine', 'Unity DOTS', 'Shader Graph', 'FMOD'],
    challenge: 'Keeping procedural generation feeling hand-crafted while maintaining performance on mid-range hardware.',
    solution: 'Implemented a BSP tree algorithm with post-processing passes that add curated set pieces and ensure critical path integrity. Used Unity Jobs System for async generation to avoid frame drops.',
    stats: [
      { number: '50+', label: 'Room Templates' },
      { number: '60fps', label: 'Target Performance' },
      { number: '3mo', label: 'Dev Time' },
      { number: '∞', label: 'Replayability' },
    ],
  },

  'devdash': {
    title: 'DevDash',
    type: 'Web Dev',
    typeClass: 'type-web',
    tagline: 'The productivity dashboard built by devs, for devs.',
    description: `DevDash is a full-stack web application that centralises a developer's 
      workflow into a single dashboard. It integrates with GitHub to surface pull requests, 
      issues, and commit activity. It includes a Pomodoro timer, task board, and analytics 
      charts — all in a keyboard-first interface.`,
    meta: {
      Year: '2024',
      Stack: 'React + Node.js',
      Role: 'Full Stack Developer',
      Duration: '2 Months',
    },
    links: {
      'Live Site': '#',
      'GitHub': '#',
    },
    features: [
      { icon: '🐙', title: 'GitHub Integration', desc: 'OAuth login pulls real-time PRs, issues, and repo stats via GitHub REST API.' },
      { icon: '⏱️', title: 'Pomodoro Timer', desc: 'Customisable work/break cycles with desktop notifications and session history.' },
      { icon: '📋', title: 'Task Board', desc: 'Drag-and-drop kanban board with priority labels and due date tracking.' },
      { icon: '📈', title: 'Analytics', desc: 'Weekly productivity charts built with Recharts showing focus time and task velocity.' },
      { icon: '⌨️', title: 'Keyboard First', desc: 'Full keyboard navigation with command palette (Cmd+K) for power users.' },
      { icon: '🌙', title: 'Dark / Light Mode', desc: 'System-aware theme that persists across sessions via localStorage.' },
    ],
    stack: ['React 18', 'Node.js', 'Express', 'PostgreSQL', 'GitHub API', 'Recharts', 'Tailwind CSS', 'Docker'],
    challenge: 'GitHub API rate limiting made real-time data syncing unreliable for users with large repositories.',
    solution: 'Built a server-side caching layer using PostgreSQL that stores API responses with a 5-minute TTL, reducing direct API calls by 80% while keeping data feeling fresh.',
    stats: [
      { number: '80%', label: 'API Calls Reduced' },
      { number: '<200ms', label: 'Avg Response Time' },
      { number: '2mo', label: 'Dev Time' },
      { number: '100%', label: 'TypeScript Coverage' },
    ],
  },

  'pixel-farm': {
    title: 'Pixel Farm',
    type: 'Game Dev',
    typeClass: 'type-game',
    tagline: 'A cozy farming sim where every season tells a new story.',
    description: `Pixel Farm is a cozy 2D farming simulation game built in Godot 4. 
      Players manage crops, build relationships with NPCs who follow daily schedules, 
      and explore a hand-crafted world across four seasons. Supports local co-op for 
      two players on the same machine.`,
    meta: {
      Year: '2024',
      Engine: 'Godot 4',
      Role: 'Solo Developer',
      Duration: '4 Months',
    },
    links: {
      'Play Demo': '#',
      'GitHub': '#',
      'Itch.io': '#',
    },
    features: [
      { icon: '🌾', title: 'Custom Tile System', desc: 'Rule-based auto-tiling with 47 transition states for seamless terrain blending.' },
      { icon: '🌤️', title: 'Day / Night Cycle', desc: 'Real-time lighting transitions with CanvasModulate and dynamic shadow casting.' },
      { icon: '🤝', title: 'NPC Schedules', desc: 'Each NPC follows a daily routine driven by a state machine and time-of-day triggers.' },
      { icon: '👥', title: 'Local Co-op', desc: 'Split-screen co-op for two players with shared farm economy and individual inventories.' },
      { icon: '🌱', title: 'Crop System', desc: 'Growth simulation with watering, seasons, soil quality, and multi-stage sprites.' },
      { icon: '💾', title: 'Save System', desc: 'SQLite-backed save system persisting world state, inventory, and NPC relationships.' },
    ],
    stack: ['Godot 4', 'GDScript', 'SQLite', 'Aseprite', 'Audacity'],
    challenge: 'Managing game state complexity with co-op — keeping two players in sync while sharing a single world simulation.',
    solution: 'Designed a centralised GameState singleton that both players read from, with an event bus pattern for state mutations. Player inputs are queued and resolved sequentially to prevent race conditions.',
    stats: [
      { number: '4', label: 'Seasons' },
      { number: '12', label: 'NPC Characters' },
      { number: '50+', label: 'Crop Varieties' },
      { number: '2', label: 'Player Co-op' },
    ],
  },

  'portfolio-3d': {
    title: '3D Portfolio Viewer',
    type: 'Web Dev',
    typeClass: 'type-web',
    tagline: 'Where WebGL meets creative portfolio presentation.',
    description: `A browser-based 3D portfolio gallery built with Three.js. Visitors 
      navigate through floating 3D panels displaying projects, with GSAP-driven scroll 
      animations and a custom WebGL post-processing pipeline for bloom, chromatic 
      aberration, and depth-of-field effects.`,
    meta: {
      Year: '2023',
      Stack: 'Three.js + GSAP',
      Role: 'Frontend Developer',
      Duration: '6 Weeks',
    },
    links: {
      'Live Site': '#',
      'GitHub': '#',
    },
    features: [
      { icon: '🌐', title: '3D Scene', desc: 'Three.js scene with custom geometry, PBR materials, and environment lighting.' },
      { icon: '📜', title: 'Scroll Animation', desc: 'GSAP ScrollTrigger drives camera movement and panel reveals on scroll.' },
      { icon: '✨', title: 'Post Processing', desc: 'Custom WebGL pipeline: bloom, chromatic aberration, and vignette effects.' },
      { icon: '📦', title: '3D Model Loading', desc: 'GLTF models created in Blender with LOD switching for performance.' },
      { icon: '📱', title: 'Responsive', desc: 'Adaptive quality settings reduce render resolution on mobile for 60fps.' },
      { icon: '♿', title: 'Accessible', desc: 'Reduced-motion fallback replaces 3D with a standard 2D card layout.' },
    ],
    stack: ['Three.js', 'GSAP', 'WebGL', 'GLSL', 'Blender', 'Vite'],
    challenge: 'Achieving 60fps on mid-range laptops with a complex 3D scene and post-processing effects active simultaneously.',
    solution: 'Implemented frustum culling, texture atlasing, and a dynamic quality scaler that detects frame drops and reduces post-processing complexity in real time.',
    stats: [
      { number: '60fps', label: 'Target Frame Rate' },
      { number: '3', label: 'Post Effects' },
      { number: '<2s', label: 'Load Time' },
      { number: '100', label: 'Lighthouse Score' },
    ],
  },

  'levelforge': {
    title: 'LevelForge',
    type: 'Tool',
    typeClass: 'type-tool',
    tagline: 'A browser-based level editor for 2D game developers.',
    description: `LevelForge is a fully browser-based tile map editor for 2D game 
      developers. It supports multi-layer editing, auto-tiling rules, entity placement, 
      and exports maps to JSON or Tiled XML format for use in Unity, Godot, or any 
      custom engine.`,
    meta: {
      Year: '2023',
      Stack: 'Vanilla JS + Canvas',
      Role: 'Solo Developer',
      Duration: '2 Months',
    },
    links: {
      'Try It Live': '#',
      'GitHub': '#',
      'Docs': '#',
    },
    features: [
      { icon: '🗂️', title: 'Multi-Layer Editing', desc: 'Unlimited layers with visibility toggles, lock controls, and blend modes.' },
      { icon: '🧩', title: 'Auto-Tiling', desc: '47-rule bitmask auto-tiling for seamless terrain without manual tile selection.' },
      { icon: '📤', title: 'Export Formats', desc: 'Export to JSON, Tiled XML (.tmx), or CSV — compatible with Unity, Godot, and custom engines.' },
      { icon: '↩️', title: 'Undo / Redo', desc: 'Full command pattern undo/redo stack with 100-step history.' },
      { icon: '💾', title: 'IndexedDB Storage', desc: 'Projects auto-save to browser storage — no account or server needed.' },
      { icon: '⚡', title: 'Canvas Rendering', desc: 'Hardware-accelerated Canvas 2D with viewport panning, zooming, and grid snap.' },
    ],
    stack: ['Vanilla JS', 'Canvas API', 'IndexedDB', 'Web Workers', 'CSS Grid'],
    challenge: 'Rendering large tilemaps (200x200+) at 60fps with multiple visible layers without dropping frames during editing.',
    solution: 'Split rendering into dirty-region tracking — only re-rendering tiles that changed in each frame using a quad-tree spatial index to identify affected regions.',
    stats: [
      { number: '200x200', label: 'Max Map Size' },
      { number: '60fps', label: 'Render Target' },
      { number: '3', label: 'Export Formats' },
      { number: '0', label: 'Dependencies' },
    ],
  },

  'gameapi': {
    title: 'GameAPI Backend',
    type: 'Web Dev',
    typeClass: 'type-web',
    tagline: 'Production-ready multiplayer backend infrastructure for indie games.',
    description: `GameAPI is a scalable backend service designed for indie multiplayer 
      games. It provides REST endpoints for auth, player profiles, and leaderboards, 
      plus WebSocket rooms for real-time game state synchronisation. Containerised with 
      Docker for easy self-hosting or cloud deployment.`,
    meta: {
      Year: '2024',
      Stack: 'Node.js + Socket.io',
      Role: 'Backend Developer',
      Duration: '6 Weeks',
    },
    links: {
      'Documentation': '#',
      'GitHub': '#',
      'npm Package': '#',
    },
    features: [
      { icon: '🔐', title: 'Auth System', desc: 'JWT-based auth with refresh tokens, OAuth (Google/Discord), and rate limiting.' },
      { icon: '🏆', title: 'Leaderboards', desc: 'Redis sorted sets power real-time global and friend leaderboards with pagination.' },
      { icon: '🔌', title: 'WebSocket Rooms', desc: 'Socket.io room management for real-time game state sync across clients.' },
      { icon: '🎯', title: 'Matchmaking', desc: 'Skill-based matchmaking queue with ELO rating and region-aware pairing.' },
      { icon: '📊', title: 'Analytics Events', desc: 'Game event tracking pipeline with aggregation for player behaviour insights.' },
      { icon: '🐳', title: 'Docker Ready', desc: 'Multi-container Docker Compose setup with Nginx, Node, Redis, and Postgres.' },
    ],
    stack: ['Node.js', 'Express', 'Socket.io', 'Redis', 'PostgreSQL', 'Docker', 'Nginx', 'JWT'],
    challenge: 'Ensuring sub-100ms WebSocket message delivery for real-time game state while handling hundreds of concurrent rooms.',
    solution: 'Used Redis pub/sub as the message broker between Node.js instances, enabling horizontal scaling. Room state is stored in Redis with TTL eviction so crashed rooms self-clean.',
    stats: [
      { number: '<100ms', label: 'WS Latency' },
      { number: '500+', label: 'Concurrent Rooms' },
      { number: '99.9%', label: 'Uptime Target' },
      { number: '6', label: 'API Modules' },
    ],
  },

};

// ── Renderer ──────────────────────────────────────────────────
function renderProject() {
  const params  = new URLSearchParams(window.location.search);
  const id      = params.get('id');
  const project = PROJECTS[id];
  const root    = document.getElementById('project-root');

  if (!project) {
    root.innerHTML = `
      <div class="not-found">
        <h1>404</h1>
        <p>Project not found.</p>
        <a href="index.html" class="btn btn-primary">← Back to Portfolio</a>
      </div>`;
    return;
  }

  // Update page title
  document.title = `${project.title} — Portfolio`;

  // Build meta rows
  const metaHTML = Object.entries(project.meta).map(([k, v]) => `
    <div class="project-meta-item">
      <div class="project-meta-label">${k}</div>
      <div class="project-meta-value">${v}</div>
    </div>`).join('');

  // Build action links
  const linksHTML = Object.entries(project.links).map(([label, href]) => `
    <a href="${href}" class="btn btn-primary" target="_blank" rel="noopener">${label}</a>`
  ).join('');

  // Build feature cards
  const featuresHTML = project.features.map(f => `
    <div class="feature-item">
      <div class="feature-icon">${f.icon}</div>
      <div class="feature-title">${f.title}</div>
      <div class="feature-desc">${f.desc}</div>
    </div>`).join('');

  // Build tech pills
  const stackHTML = project.stack.map(t =>
    `<span class="tech-pill">${t}</span>`).join('');

  // Build stats
  const statsHTML = project.stats.map(s => `
    <div class="stat-box">
      <div class="stat-number">${s.number}</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join('');

  root.innerHTML = `
    <div class="project-hero">
      <a href="index.html#projects" class="back-btn">Back to Projects</a>

      <span class="project-hero-type ${project.typeClass}">${project.type}</span>
      <h1>${project.title}</h1>
      <p class="project-hero-desc">${project.tagline}</p>

      <div class="project-meta-row">${metaHTML}</div>
      <div class="project-action-links">${linksHTML}</div>
    </div>

    <div class="project-content">

      <div class="content-block">
        <div class="section-label">Overview</div>
        <h2>About This Project</h2>
        <p>${project.description}</p>
      </div>

      <div class="content-block">
        <div class="section-label">Features</div>
        <h2>What It Does</h2>
        <div class="feature-list">${featuresHTML}</div>
      </div>

      <div class="content-block">
        <div class="section-label">Tech Stack</div>
        <h2>Built With</h2>
        <div class="tech-stack-full">${stackHTML}</div>
      </div>

      <div class="content-block">
        <div class="section-label">Case Study</div>
        <h2>Challenge &amp; Solution</h2>
        <div class="challenge-grid">
          <div class="challenge-card">
            <div class="challenge-card-label">The Challenge</div>
            <p>${project.challenge}</p>
          </div>
          <div class="challenge-card solution">
            <div class="challenge-card-label">The Solution</div>
            <p>${project.solution}</p>
          </div>
        </div>
      </div>

      <div class="content-block">
        <div class="section-label">Outcomes</div>
        <h2>By the Numbers</h2>
        <div class="stats-row">${statsHTML}</div>
      </div>

    </div>`;

  // Trigger scroll reveals
  document.querySelectorAll('.feature-item, .challenge-card, .stat-box, .tech-pill').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 40}ms, transform 0.5s ease ${i * 40}ms`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  });
}

renderProject();