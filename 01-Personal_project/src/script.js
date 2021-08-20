import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {DoubleSide, MaterialLoader, TextureLoader, CubeTextureLoader, LoadingManager} from 'three'

const textureLoader = new THREE.TextureLoader() 
const gui = new dat.GUI() // debug
const scene = new THREE.Scene() // sets the scene 
const canvas = document.querySelector('canvas.webgl') // links to the canvas element
const cubeTextureLoader = new THREE.CubeTextureLoader()

// add texture image to plane 


//size 
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//env map
const enviromentTextureMap = cubeTextureLoader.load([
    './environmentMaps/3/px.jpg',
    './environmentMaps/3/nx.jpg',
    './environmentMaps/3/py.jpg',
    './environmentMaps/3/ny.jpg',
    './environmentMaps/3/pz.jpg',
    './environmentMaps/3/nz.jpg'
])


const mapTexture = textureLoader.load('./environmentMaps/3/px.jpg')
const mapTexture2 = textureLoader.load('./environmentMaps/3/nx.jpg')
const mapTexture3 = textureLoader.load('./environmentMaps/3/pz.jpg')

//3d object 
const matCapTexture = textureLoader.load('./Textures/3.png')

const geometry = new THREE.SphereGeometry(1, 32, 32)
const material = new THREE.MeshStandardMaterial()

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial()
)
sphere.material.matcap = matCapTexture
sphere.material.metalness = 0.45
sphere.material.roughness = 0.35
sphere.material.envMap = enviromentTextureMap


const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(50, 32, 32),
  new THREE.MeshStandardMaterial()
)
sphere2.material.side = THREE.BackSide
sphere2.material.matcap = matCapTexture
sphere2.material.metalness = 1
sphere2.material.roughness = 0
sphere2.material.envMap = enviromentTextureMap


scene.add(sphere, sphere2)

// const plane = new THREE.Mesh(
//   new THREE.PlaneGeometry(20,20), 
//   new THREE.MeshStandardMaterial({map: mapTexture})
// )
// plane.material.side = THREE.DoubleSide
// plane.position.x = -10
// plane.rotation.y = Math.PI *0.5

// const plane2 = new THREE.Mesh(
//   new THREE.PlaneGeometry(20,20), 
//   new THREE.MeshStandardMaterial({map: mapTexture2})
// )
// plane2.material.side = THREE.DoubleSide
// plane2.position.x = 10
// plane2.rotation.y = Math.PI * 0.5

// const plane3 = new THREE.Mesh(
//   new THREE.PlaneGeometry(20,20), 
//   new THREE.MeshStandardMaterial({map: mapTexture3})
// )
// plane3.material.side = THREE.DoubleSide
// plane3.position.z = 12

// scene.add(sphere, plane, plane2, plane3)

// camera 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
scene.add(directionalLight)


// renderer -------------------------
const renderer = new THREE.WebGL1Renderer({
  canvas
})
const controls = new OrbitControls(camera, canvas)

renderer.setSize(sizes.width, sizes.height) // leaves no white space around edges
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // dynamically applies pixel ratio




// ticker -------------START---------------
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  controls.update()

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick) // creates recursion 
}
tick()
// ticker-------------- END ----------------


// window resizer ------------START-----------
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height


  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
// window resizer -----------END--------------


// debug options
gui.add(sphere.material, 'metalness').min(0).max(1).step(0.0001)
gui.add(sphere.material, 'roughness').min(0).max(1).step(0.0001)


renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)