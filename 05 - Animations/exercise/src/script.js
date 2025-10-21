import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 8
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock();
const tick = () => {
    // const currTime = Date.now()
    // // const deltaTime = currTime-time;
    // const deltaTime = clock.getDelta();
    //
    // mesh.position.x = Math.sin(clock.getElapsedTime()) * 4
    // mesh.position.y = Math.cos(clock.getElapsedTime()) * 4
    // camera.lookAt(mesh.position)
    //
    // //
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
};

import { gsap, Quad } from 'gsap'
gsap.to(mesh.position, { duration: .51, x: 2, ease: Quad.easeInOut, yoyo: 1, repeat: 10 })

tick();



