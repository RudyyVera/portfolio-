import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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
  scene.background = new THREE.Color(0x0b0d13);
  scene.fog = new THREE.Fog(0x0b0d13, 20, 150);

  // Cámara - Más alejada para ver todo el modelo
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
  camera.position.set(2, 2.2, 9);
  camera.lookAt(0, 0, 0);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);
  
  console.log('✅ Renderer creado y agregado al DOM');

  // Cubo de fallback para ver algo mientras carga
  const testCube = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.2, 1.2),
    new THREE.MeshStandardMaterial({ color: 0x60a5fa })
  );
  testCube.position.set(0, 0.6, 0);
  testCube.castShadow = true;
  testCube.receiveShadow = true;
  scene.add(testCube);
  console.log('🔷 Cubo de fallback agregado');

  // Suelo simple
  const planeGeometry = new THREE.PlaneGeometry(20, 20);
  const planeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x0b0d13,
    roughness: 0.8 
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -1;
  plane.receiveShadow = true;
  scene.add(plane);

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

  console.log('Cargando modelo orthographic_bedroom.glb...');
  
  loader.load(
    './assets/models/orthographic_bedroom.glb',
    (gltf) => {
      laptop = gltf.scene;
      laptop.castShadow = true;
      laptop.receiveShadow = true;
      laptop.traverse((child) => {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.envMapIntensity = 1;
          child.material.needsUpdate = true;
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
      const targetSize = 8; // ancho objetivo en escena
      if (maxDim > 0) {
        const scale = targetSize / maxDim;
        laptop.scale.setScalar(scale);
      }

      // Colocar sobre el piso
      laptop.position.y -= size.y * 0.5 * laptop.scale.y;

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
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    
    targetRotationY = mouseX * 0.4;
    targetRotationX = mouseY * 0.3;
  });

  // Animación
  function animate() {
    requestAnimationFrame(animate);

    if (laptop) {
      // Oculta cubo de fallback cuando cargue el modelo
      testCube.visible = false;

      laptop.rotation.y += 0.003;
      laptop.rotation.y += (targetRotationY - laptop.rotation.y) * 0.05;
      laptop.rotation.x += (targetRotationX - laptop.rotation.x) * 0.05;
    } else {
      // Mientras no haya modelo, rota el cubo para ver algo
      testCube.rotation.y += 0.01;
      testCube.rotation.x += 0.005;
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
