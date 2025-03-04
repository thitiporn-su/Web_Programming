import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

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

// Clock
const clock = new THREE.Clock()
// Animations
const tick = () =>
{
   // Clock
   const elapsedTime = clock.getElapsedTime()
   console.log(elapsedTime)



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
