import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {BufferAttribute, BufferGeometry, MeshBasicMaterial} from "three";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
// const geometry = new THREE.SphereGeometry(1, 16, 16)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
// const mesh = new THREE.Mesh(geometry, material)

// Basic BufferGeometry
// const geometry = new THREE.BufferGeometry();
// const positionsArray = new Float32Array([
//   0, 0, 0,
//   0, 1, 0,
//   1, 0, 0
// ]);
// const positionsAttribute = new BufferAttribute(positionsArray, 3)
// geometry.setAttribute('position', positionsAttribute)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
// const mesh = new THREE.Mesh(geometry, material)


// For loop
const totalTriangles = 20;
const positionsArray = new Float32Array(totalTriangles * 3 * 3)

for (var i = 0; i < totalTriangles * 3 * 3; i+=3) {
    positionsArray[i] = (Math.random() - 0.5) * 10;
    positionsArray[i+1] = (Math.random() - 0.5) * 10;
    positionsArray[i+2] = (Math.random() - 0.5) * 10;
}

const positionsAttribute = new BufferAttribute(positionsArray, 3);
const geom = new BufferGeometry();
geom.setAttribute('position', positionsAttribute);
const mat = new MeshBasicMaterial({ color: 0x00FF00, wireframe: true })
const mesh = new THREE.Mesh(geom, mat)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()