import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const mesh1 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color: 0x00FF00 })
)
mesh1.position.set(-1,0,0);

const mesh2 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color: 0xFF0000 })
)
mesh2.position.set(2,0,0);

const mesh3 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color: 0xAA00FF })
)
mesh3.position.set(2,2, 0);


const group = new THREE.Group();
scene.add(group);
group.add(mesh1)
group.add(mesh2)
group.add(mesh3)


/**
 * Axes Helper
 */

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
camera.position.x = 1;
camera.position.y = 1;
scene.add(camera);
// camera.lookAt(mesh.position);


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)