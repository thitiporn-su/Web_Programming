import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

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


// Debug
const gui = new GUI({
  width: 300,
  title: 'Nice debug UI',
  closeFolders: false
});
window.addEventListener('keydown', (event)=>
{
  if(event.key == 'h')
      gui.show(gui._hidden)
})


// Canvas
const canvas = document.querySelector("canvas.webgl");
// **Scene**
const scene = new THREE.Scene();
// **Object**
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.position.set(1.7, 1, -1)
mesh.scale.set(0.5, 0.5, 1)
mesh.rotation.reorder('YXZ')
mesh.rotation.y = Math.PI * 0.25
mesh.rotation.x = Math.PI * 0.25
// // group object
// const group = new THREE.Group()
// group.position.y = -0.5
// group.scale.y = 0.7
// group.rotation.y = 1.1
// scene.add(group)
// const cube1 = new THREE.Mesh(
//    new THREE.BoxGeometry(1,1,1),
//    new THREE.MeshBasicMaterial({color:0xff0000})
// )
// group.add(cube1)
// const cube2 = new THREE.Mesh(
//    new THREE.BoxGeometry(1,1,1),
//    new THREE.MeshBasicMaterial({color:0x00ff00})
// )
// cube2.position.x = -2
// group.add(cube2)
// const cube3 = new THREE.Mesh(
//    new THREE.BoxGeometry(1,1,1),
//    new THREE.MeshBasicMaterial({color:0x0000ff})
// )
// cube3.position.x = 2
// group.add(cube3)

// // Texture
// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load('/textures/door/color.jpg')
// texture.colorSpace = THREE.SRGBColorSpace


const debugObject = {}

debugObject.color = "#3a6ea6"
const cubeTweaks = gui.addFolder('Awesome cube')
cubeTweaks.close()
cubeTweaks
 .add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation")
cubeTweaks.add(mesh, "visible")

cubeTweaks.add(material, "wireframe")
cubeTweaks.addColor(debugObject, "color")
 .onChange(() => {
  material.color.set(debugObject.color)
})

debugObject.subdivision = 2
cubeTweaks
   .add(debugObject, 'subdivision').min(1).max(20).step(1)
   .onChange(()=> {
       mesh.geometry.dispose()
       mesh.geometry = new THREE.BoxGeometry(
           1,1,1,
           debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
       )
   })
const myObject = {
 myVariable: 1337,
}
gui.add(myObject, "myVariable")


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

// Fullscreen when doubleclick
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// **Camera**
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// **Renderer**
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/*
* Particles circle
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


// Fonts hello world and donuts
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


// Clock
const clock = new THREE.Clock()
// Animations
const tick = () =>
{
   // Clock
   const elapsedTime = clock.getElapsedTime()
   console.log(elapsedTime)

  // update particles circle
  particles.rotation.y = elapsedTime * 0.2
  for(let i=0; i<count; i++)
  {
    const i3 = i*3
    const x = particlesGeometry.attributes.position.array[i3]
  }
  particlesGeometry.attributes.position.needsUpdate = true

   // Update objects
   mesh.rotation.y = elapsedTime * Math.PI * 2
   mesh.position.y = Math.sin(elapsedTime)
   mesh.position.x = Math.cos(elapsedTime)
  //  group.rotation.y = elapsedTime * Math.PI * 2

  // Update controls
  controls.update();

   // Render
   renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick();
