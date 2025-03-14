import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

// Textures
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/6.png')
const gradientTexture = textureLoader.load('./textures/gradients/5.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

// Environment map
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap)=>
{
  environmentMap.mapping = THREE.EquirectangularReflectionMapping
  scene.background = environmentMap
  scene.environment = environmentMap
})


// Canvas
const canvas = document.querySelector("canvas.webgl");
// Scene
const scene = new THREE.Scene();
// // Object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// material.map = doorColorTexture
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
// Fullscreen
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);
// Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

 /*
 * Particles
 */
 // geometry
 // geometry
 const particlesGeometry = new THREE.BufferGeometry()
 const count = 15000
 const positions = new Float32Array(count * 3)
 const colors = new Float32Array(count * 3)
 for(let i=0; i<count*3; i++)
 {
  positions[i] = (Math.random() - 0.5) * 10
  colors[i] = Math.random()
 }
 particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
 particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
 
  // Textures
  const particlesTexture = textureLoader.load('/textures/particles/2.png')

 // material
 const particlesMaterial = new THREE.PointsMaterial()
 particlesMaterial.size = 0.1
 particlesMaterial.sizeAttenuation = true
 particlesMaterial.color = new THREE.Color('#ff88cc')
 particlesMaterial.transparent = true
 particlesMaterial.alphaMap = particlesTexture
 //particlesMaterial.alphaTest = 0.001
 //particlesMaterial.depthTest = false
 particlesMaterial.depthWrite = false
 particlesMaterial.blending = THREE.AdditiveBlending
 particlesMaterial.vertexColors = true

 // points
 const particles = new THREE.Points(particlesGeometry, particlesMaterial)
 scene.add(particles)

// Animate
const clock = new THREE.Clock();

// Fonts
const fontLoader = new FontLoader()
fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) =>
  {
    const textGeometry = new TextGeometry(
      'Hello World!',
      {
        font: font,
        size: 0.5,
        depth: 0.2,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4
      }
    ) 
      textGeometry.center()
      const material = new THREE.MeshMatcapMaterial()
      material.matcap = matcapTexture
      const text = new THREE.Mesh(textGeometry, material)
      scene.add(text)

      // generate donut
      const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
      for(let i=0; i < 500; i++)
      {
        const donut = new THREE.Mesh(donutGeometry, material)
        donut.position.x = (Math.random() - 0.5) * 10
        donut.position.y = (Math.random() - 0.5) * 10
        donut.position.z = (Math.random() - 0.5) * 10
        donut.rotation.x = Math.random() * Math.PI
        donut.rotation.y = Math.random() * Math.PI
        const scale = Math.random()
        donut.scale.set(scale, scale, scale)
        scene.add(donut)
      }


    }
)

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // update particles
  particles.rotation.y = elapsedTime * 0.2
  for(let i=0; i<count; i++)
  {
    const i3 = i*3
    const x = particlesGeometry.attributes.position.array[i3]
  }
  particlesGeometry.attributes.position.needsUpdate = true
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
