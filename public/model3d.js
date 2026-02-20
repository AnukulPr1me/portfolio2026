/* ============================================================
   model3d.js — Hero 3D Model Viewer (Three.js r128)
   ============================================================
   HOW TO USE YOUR OWN MODEL:
   1. Export your model as GLB from Blender (File > Export > glTF 2.0)
   2. Place the .glb file in your /public folder
   3. Change MODEL_PATH below to your file name e.g. 'myrobot.glb'
   ============================================================ */

const MODEL_PATH = 'model.glb'; // ← Change this to your GLB file name

(function () {
  const container   = document.getElementById('hero-3d');
  const canvas      = document.getElementById('three-canvas');
  const loadingEl   = document.getElementById('model-loading');
  const fillEl      = document.getElementById('loading-fill');
  const loadTextEl  = document.getElementById('loading-text');

  // ── Scene Setup ─────────────────────────────────────────
  const W = container.clientWidth;
  const H = container.clientHeight;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
  camera.position.set(0, 1, 4);

  // ── Lights ───────────────────────────────────────────────
  // Ambient
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  // Key light
  const keyLight = new THREE.DirectionalLight(0xf5a623, 1.8);
  keyLight.position.set(3, 5, 3);
  keyLight.castShadow = true;
  scene.add(keyLight);

  // Fill light
  const fillLight = new THREE.DirectionalLight(0x7c6af7, 0.8);
  fillLight.position.set(-3, 2, -2);
  scene.add(fillLight);

  // Rim light
  const rimLight = new THREE.DirectionalLight(0xe05c5c, 0.6);
  rimLight.position.set(0, -2, -4);
  scene.add(rimLight);

  // ── OrbitControls ────────────────────────────────────────
  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping   = true;
  controls.dampingFactor   = 0.06;
  controls.enablePan       = false;
  controls.minDistance     = 1.5;
  controls.maxDistance     = 8;
  controls.autoRotate      = true;
  controls.autoRotateSpeed = 1.5;

  // Stop auto-rotate when user interacts
  canvas.addEventListener('pointerdown', () => { controls.autoRotate = false; });

  // ── Floating particles ────────────────────────────────────
  const particleCount = 60;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 6;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xf5a623,
    size: 0.025,
    transparent: true,
    opacity: 0.6,
  });
  scene.add(new THREE.Points(particleGeo, particleMat));

  // ── Load Model ────────────────────────────────────────────
  let model = null;

  const loader = new THREE.GLTFLoader();

  loader.load(
    MODEL_PATH,

    // ✅ On success
    (gltf) => {
      model = gltf.scene;

      // Auto-center and scale the model to fit the viewer
      const box    = new THREE.Box3().setFromObject(model);
      const size   = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale  = 2.2 / maxDim;

      model.scale.setScalar(scale);

      // Move model so its center is exactly at world origin (0, 0, 0)
      model.position.set(
        -center.x * scale,
        -center.y * scale,
        -center.z * scale
      );

      // Enable shadows on all meshes
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow    = true;
          node.receiveShadow = true;
        }
      });

      scene.add(model);

      // Point orbit controls at the origin (where model now sits)
      controls.target.set(0, 0, 0);
      controls.update();

      // Set float base position
      baseY = model.position.y;

      // Hide loading screen
      loadingEl.classList.add('hidden');
      container.classList.add('loaded');
    },

    // 📊 Progress
    (xhr) => {
      if (xhr.total > 0) {
        const pct = Math.round((xhr.loaded / xhr.total) * 100);
        fillEl.style.width   = pct + '%';
        loadTextEl.textContent = `Loading... ${pct}%`;
      }
    },

    // ❌ On error — show placeholder message
    (err) => {
      console.warn('3D model not found:', err);
      loadingEl.innerHTML = `
        <div id="no-model-msg">
          <div class="placeholder-icon">🎮</div>
          <p>Place your <strong>model.glb</strong> file<br>in the public/ folder<br>to display your 3D model here.</p>
        </div>`;
    }
  );

  // ── Animate ───────────────────────────────────────────────
  const clock = new THREE.Clock();
  let baseY = 0; // set after model loads

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Gentle floating animation around center
    if (model) {
      model.position.y = baseY + Math.sin(t * 0.8) * 0.08;
    }

    // Animate particles slowly
    particleGeo.attributes.position.array.forEach((_, i) => {
      if (i % 3 === 1) {
        particleGeo.attributes.position.array[i] += Math.sin(t + i) * 0.0003;
      }
    });
    particleGeo.attributes.position.needsUpdate = true;

    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // ── Resize handler ────────────────────────────────────────
  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

})();