import './style.css'
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { Font } from 'three/examples/jsm/loaders/FontLoader'
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader'
import { gsap } from "gsap"
 
const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75 , window.innerWidth / window.innerHeight,1,1000);
const renderer = new Three.WebGL1Renderer({
  canvas: document.querySelector('#container'),
});
document.body.appendChild( renderer.domElement );
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.setZ(25);
renderer.render(scene, camera);


const loader = new TTFLoader()
loader.load('https://api.fontsource.org/v1/fonts/lora/latin-600-italic.ttf', (fontdata) =>{
  const font = new Font(fontdata)
  const text = new TextGeometry('Tiny World',{
    font: font,
    size: 10,
    height: 2,
    curveSegments: 16,
  });
  const material = new Three.MeshPhongMaterial({color: 0xFF0000})
  const font1 = new Three.Mesh(text, material);
  font1.position.set(0,0,0)

  const boundingBox = new Three.Box3()
  font1.geometry.computeBoundingBox()
  const vector = new Three.Vector3(0,0,0)
  boundingBox.copy(font1.geometry.boundingBox).getCenter(vector)
  font1.geometry.translate(-vector.x,-vector.y,-vector.z)

  gsap.fromTo(font1.rotation, {
    z: -Math.PI/12
  },{
    z: Math.PI/12,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  })
  scene.add(font1)
})





const light = new Three.DirectionalLight(0x0000FF,30)
light.position.set(-9,-9,-9)
const light1 = new Three.PointLight(0xFF0000,100)
light1.position.set(-4,-4,-4)
const light2 = new Three.DirectionalLight(0x00FF00,100)
light2.position.set(5,5,5)
const light3 = new Three.DirectionalLight(0xFFFF00,60)
light3.position.set(6,6,6)
const alight = new Three.AmbientLight(0xFFA500)
scene.add(light, light1, light2, light3, alight)


const geometry = new Three.TorusGeometry(0.5, 0.27, 50, 100)
const material = new Three.MeshPhongMaterial({ color: 0xFF0000 });


function adddonut() {
  const torus = new Three.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => Three.MathUtils.randFloatSpread(150));
  torus.position.set(x, y, z)
  const [a, b, c] = Array(3).fill().map(() => Three.MathUtils.randFloatSpread(100));
  torus.rotateX(Three.MathUtils.degToRad(a))
  torus.rotateY(Three.MathUtils.degToRad(b))
  torus.rotateZ(Three.MathUtils.degToRad(c))
  scene.add(torus)
}
Array(300).fill().forEach(adddonut)

const geo = new Three.BoxGeometry(2,2,2)

function addcube(){
  const square = new Three.Mesh(geo, material)
  const[x,y,z] = Array(3).fill().map(() => Three.MathUtils.randFloatSpread(150));
  square.position.set(x,y,z)
  const [a, b, c] = Array(3).fill().map(() => Three.MathUtils.randFloatSpread(100));
  square.rotateX(Three.MathUtils.degToRad(a))
  square.rotateY(Three.MathUtils.degToRad(b))
  square.rotateZ(Three.MathUtils.degToRad(c))
  scene.add(square)
}
Array(300).fill().forEach(addcube)

gsap.fromTo(scene.rotation, {
  z: -Math.PI/6
},{
  z: Math.PI/12,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
})

const container = document.getElementById('container')
const initialPosition = {x: camera.position.x, y: camera.position.y}
container.addEventListener('mousemove', onMouseMove);
function onMouseMove(events){
  const mouseX = ((events.clientX/container.clientWidth)*2-1)
  const mouseY = -((events.clientY/container.clientHeight)*2-1)
  camera.position.x = initialPosition.x + mouseX * 110
  camera.position.y = initialPosition.y + mouseY * 110
  renderer.render(scene, camera)
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene,camera)
}
animate()







