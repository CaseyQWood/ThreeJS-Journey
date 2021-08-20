// scene
const scene = new THREE.Scene()

// red cube
const geometry = new THREE.BoxGeometry(1, 1, 1)

// create mesh 
const material = new THREE.MeshBasicMaterial({ color: 0xffff00})

// initiate the mesh (take in two values in this order )
const mesh = new THREE.Mesh(geometry, material)

// add mesh to the scene
scene.add(mesh)

//camera (can have mulitple camera if needed but always viewing from one)
//(first input is the vertical field of view)
//(second is the aspect ratio(width/hieght), this is usually depicted by the view port )
const size = {
  width: 800,
  height: 600
}

const camera = new THREE.PerspectiveCamera(75, size.width/size.height)
camera.position.z = 3
scene.add(camera)

//create rendered and canvas
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas
})
// resets the size of the canvas
renderer.setSize(size.width, size.height)

//this takes the scene and the camera
renderer.render(scene, camera)

