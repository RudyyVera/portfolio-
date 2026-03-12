import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

console.log('🚀 laptop3d.js cargado');

function initLaptop3D() {
  const container = document.getElementById('laptop3D');
  if (!container) {
    console.error('❌ Container laptop3D no encontrado');
    return;
  }

  console.log('✅ Container encontrado:', container);
  console.log('📐 Dimensiones:', container.clientWidth, 'x', container.clientHeight);

  // Limpiar contenido previo
  container.innerHTML = '';

  // Dimensiones del contenedor
  let width = container.clientWidth || 800;
  let height = container.clientHeight || 600;

  console.log('📏 Usando dimensiones:', width, 'x', height);

  // Escena
  const scene = new THREE.Scene();
  scene.background = null; // Fondo transparente
  // Sin fog

  // Cámara - Más alejada para ver todo el modelo
  const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
  camera.position.set(0, 2, 12); // Más centrada y alejada
  camera.lookAt(0, 0, 0);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Controles de órbita
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 6;
  controls.maxDistance = 20;
  controls.enablePan = false;
  controls.target.set(0, 0, 0);
  controls.update();
  container.appendChild(renderer.domElement);
  
  console.log('✅ Renderer creado y agregado al DOM');

  // Suelo simple
  // Eliminar suelo para vista libre

  // Luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0b0d13, 0.6);
  scene.add(hemiLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 2);
  mainLight.position.set(10, 12, 8);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  mainLight.shadow.camera.far = 50;
  mainLight.shadow.camera.left = -20;
  mainLight.shadow.camera.right = 20;
  mainLight.shadow.camera.top = 20;
  mainLight.shadow.camera.bottom = -20;
  mainLight.shadow.bias = -0.001;
  scene.add(mainLight);

  const accentLight1 = new THREE.PointLight(0x60a5fa, 2);
  accentLight1.position.set(-5, 5, 5);
  scene.add(accentLight1);

  const accentLight2 = new THREE.PointLight(0x60a5fa, 1.5);
  accentLight2.position.set(5, 5, -5);
  scene.add(accentLight2);

  // Cargar modelo
  const loader = new GLTFLoader();
  let laptop;

  console.log('Cargando modelo iphone_17_pro_max.glb...');
  
  loader.load(
    './assets/models/iphone_17_pro_max.glb',
    (gltf) => {
      laptop = gltf.scene;
      laptop.castShadow = true;
      laptop.receiveShadow = true;
      laptop.traverse((child) => {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          // Efecto general para todo el modelo
          child.material.envMapIntensity = 2;
          child.material.metalness = 0.7;
          child.material.roughness = 0.15;
          child.material.clearcoat = 0.6;
          child.material.clearcoatRoughness = 0.1;
          child.material.needsUpdate = true;
          // Efecto vidrio para cámaras
          if (child.name && child.name.toLowerCase().includes('camera')) {
            child.material.color.set(0x1a2a3a); // azul oscuro
            child.material.metalness = 1;
            child.material.roughness = 0.05;
            child.material.clearcoat = 1;
            child.material.clearcoatRoughness = 0.05;
            child.material.transparent = true;
            child.material.opacity = 0.85;
            child.material.reflectivity = 0.9;
            child.material.needsUpdate = true;
          }
        }
      });

      // Centramos y escalamos automáticamente para que quepa en cámara
      const box = new THREE.Box3().setFromObject(laptop);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);

      // Mover al origen
      laptop.position.sub(center);

      // Escalar a un tamaño objetivo
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetSize = 6; // tamaño óptimo y centrado
      if (maxDim > 0) {
        const scale = targetSize / maxDim;
        laptop.scale.setScalar(scale);
      }

      // Colocar sobre el piso
      // Centrar verticalmente el modelo
      laptop.position.y -= size.y * 0.18 * laptop.scale.y; // Centrado, sin sobrepasar el header

      // Rotación inicial para vista de perfil
      if (laptop) {
        laptop.rotation.y = Math.PI / 2; // De perfil al iniciar
        laptop.rotation.x = 0.15; // Leve inclinación
      }

      scene.add(laptop);
      console.log('✅ Modelo 3D cargado y ajustado');
      console.log('Bounds:', box, 'size:', size, 'center:', center, 'maxDim:', Math.max(size.x, size.y, size.z));
    },
    (progress) => {
      console.log('Cargando modelo:', Math.round((progress.loaded / progress.total) * 100) + '%');
    },
    (error) => {
      console.error('❌ Error cargando modelo 3D:', error);
    }
  );

  // Interactividad

  // Animación
  let autoRotation = 0;
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    if (laptop) {
      autoRotation += 0.005;
      // Rotación elíptica/curva
      laptop.rotation.y = Math.PI / 2 + Math.sin(autoRotation) * 1.1; // de trasera a delantera
      laptop.rotation.x = 0.15 + Math.cos(autoRotation) * 0.22; // inclinación suave
    }
    renderer.render(scene, camera);
  }

  console.log('Iniciando animación...');
  animate();

  // Responsive
  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    
    if (newWidth > 0 && newHeight > 0) {
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    }
  });
}

// Inicializar cuando el DOM esté listo
console.log('Script laptop3d.js cargado, document.readyState:', document.readyState);

// Intentar inicializar de múltiples formas para asegurar que funcione
if (document.readyState === 'loading') {
  console.log('Esperando DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded disparado');
    initLaptop3D();
  });
} else {
  console.log('DOM ya está listo, inicializando inmediatamente');
  initLaptop3D();
}

// Backup: intentar después de 500ms por si acaso
setTimeout(() => {
  const container = document.getElementById('laptop3D');
  if (container && !container.querySelector('canvas')) {
    console.log('Backup: forzando inicialización después de 500ms');
    initLaptop3D();
  }
}, 500);
