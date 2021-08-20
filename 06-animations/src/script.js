import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const group = new THREE.Group()
scene.add(group)

// Object (red square)
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
group.add(mesh)

const edges = new THREE.EdgesGeometry(geometry)
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 'blue'}))
group.add(line)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = .75
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})
gsap.to(mesh.position, {duration: 1, delay: 2, x: 0})


//************************************************************* */
// //#2
// const clock = new THREE.Clock()

// // // #1
// // let time = Date.now()

// // Animations
const tick = () => {
// console.log('tick')
// // this is setup to run at the same speed no matter the screen frame rate --- (one way to do it ) #1
//     // // gets the time 
//     // const currentTime = Date.now()
//     // const deltaTime = currentTime - time
//     // time = currentTime

//     // //update Object
//     // group.rotation.y += 0.001 * deltaTime
//     // group.rotation.x += 0.001 * deltaTime
// // -----------------------------------------------------------------------------

// // Another way to set animation change syncronus to screen frame rate ----- #2
//     const elapsedTime = clock.getElapsedTime()
    
//     //update Object
//     // group.rotation.y = elapsedTime * Math.PI
//     // group.position.x = Math.sin(elapsedTime)  

//     // makes object go in a cirle// .sin and .cos creates the changes to be a wave going from + to - of the value
//     group.position.y = Math.sin(elapsedTime)
//     group.position.x = Math.cos(elapsedTime)
// // ---------------------------------------------------------------------------


//     // calls the render
    renderer.render(scene, camera)

//     // runs the function on the next frame(this runs indefinatly)
    window.requestAnimationFrame(tick)

}

tick()

