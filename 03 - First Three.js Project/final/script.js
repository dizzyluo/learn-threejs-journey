import * as THREE from 'three'

const scene = new THREE.Scene();
const geom = new THREE.BoxGeometry(1,1,1);
const mat = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
const mesh = new THREE.Mesh(geom, mat);
scene.add(mesh)

const sizes = {
	width: 800,
	height: 600
}
const cam = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
cam.position.z = 5
scene.add(cam);

// Renderer
const canvasEl = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
	canvas: canvasEl, antialias: true
});
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, cam);