import './style.css'
import * as THREE from 'three'
import { OrthographicCamera } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'


//Curser
const curser = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    curser.x = event.clientX / sizes.width - 0.5
    curser.y = - (event.clientY / sizes.height -0.5)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 1000,
    height: 800
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera (field of view, aspect ratio, near, far )
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 100)

// const apsectRatio = sizes.width/sizes.height 
// const camera = new THREE.OrthographicCamera(-1 * apsectRatio, 1 * apsectRatio, 1, -1, 0.1, 100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    //Update camera 
    // camera.position.x = Math.sin(curser.x * Math.PI * 2) * 3 
    // camera.position.z = Math.cos(curser.x * Math.PI * 2) * 3 
    // camera.position.y = curser.y * 5
    // camera.lookAt(mesh.position)

    // part of smoothing the movement
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()