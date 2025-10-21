import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui';
import {RGBELoader} from "three/addons";

const gui = new GUI
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const dooraAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const colorTexture = textureLoader.load('/textures/door/color.jpg')
colorTexture.colorSpace = THREE.SRGBColorSpace;

const heightTexture = textureLoader.load('/textures/door/height.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const matcapTexture = textureLoader.load('/textures/matcaps/7.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace;

const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')


/**
 * Materials
 */

// Basic
// const material = new THREE.MeshBasicMaterial();
// // material.wireframe = true
// material.transparent = true
// material.side = THREE.DoubleSide
// material.map = colorTexture
// material.alphaMap = doorAlphaTexture

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true

// MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture;

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial()

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial()

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0xDD00FF)

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial()
// material.color = new THREE.Color(0xADFEFE);
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// // gradientTexture.minFilter = THREE.NearestFilter;
// material.gradientMap = gradientTexture

const debugValues = {
	color: '#FFFFFF'
}

// MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial()
// material.color = new THREE.Color(debugValues.color)
// material.metalness = 1//0.7;
// material.roughness = 1//0.2
// material.map = colorTexture;
// material.aoMap = dooraAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = heightTexture
// material.displacementScale = 0.1;
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;
// material.normalMap = normalTexture
// material.normalScale.set(0.5, 0.5)
// material.alphaMap = doorAlphaTexture;
// material.transparent = true
// gui.add(material, 'metalness').min(0).max(1).step(0.01)
// gui.add(material, 'roughness').min(0).max(1).step(0.01)


// MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial()
material.color = new THREE.Color(debugValues.color)
material.metalness = 0//1//0.7;
material.roughness = 0//1//0.2
material.map = colorTexture;
material.aoMap = dooraAmbientOcclusionTexture
material.aoMapIntensity = 1
material.displacementMap = heightTexture
material.displacementScale = 0.1;
material.metalnessMap = metalnessTexture;
material.roughnessMap = roughnessTexture;
material.normalMap = normalTexture
material.normalScale.set(0.5, 0.5)
material.alphaMap = doorAlphaTexture;
material.transparent = true
// gui.add(material, 'clearcoat').min(0).max(1).step(0.01)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.01)

// gui.add(material, 'sheen').min(0).max(1).step(0.01)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.01)
// gui.addColor(material, 'sheenColor');

// gui.add(material, 'iridescence').min(0).max(1).step(0.01)
// gui.add(material, 'iridescenceIOR').min(0).max(1).step(0.01)
// gui.add(material.iridescenceThicknessRange, '0').min(0).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(0).max(1000).step(1)

gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(0).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)



gui.addColor(debugValues, 'color').onChange((val) => {
	console.log(val)
	debugValues.color = val;
	material.color = new THREE.Color(debugValues.color)
})


/**
 * Light
 */
// const ambientLight = new THREE.AmbientLight(0xFFFFFF,1)
// scene.add(ambientLight)
//
// const pointLight = new THREE.PointLight(0xFFFFFF,20)
// pointLight.position.x = 1
// pointLight.position.y = 2
// pointLight.position.z = 3
// scene.add(pointLight)


/**
 * Env Maps
 */

const rgbeLoader = new RGBELoader();
rgbeLoader.load('/textures/environmentMap/2k.hdr', (envMap) => {
	console.log("Loaded Env Map")
	envMap.mapping = THREE.EquirectangularReflectionMapping
	scene.background = envMap
	scene.environment = envMap
});


/**
 * Geometry
 */
const sphereGeometry = new THREE.SphereGeometry(1, 32);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
sphereMesh.position.x = 2
const planeGeometry = new THREE.PlaneGeometry(1, 1, 128, 128);
const planeMesh = new THREE.Mesh(planeGeometry, material);
planeMesh.position.x = -2

const torusGeometry = new THREE.TorusGeometry(.5, 0.2, 128, 128);
const torusMesh = new THREE.Mesh(torusGeometry, material);


scene.add(sphereMesh, planeMesh, torusMesh)

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

window.addEventListener('resize', () => {
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
	const elapsedTime = clock.getElapsedTime()
	
	// Update controls
	controls.update()
	
	// Render
	renderer.render(scene, camera)
	
	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
	
	planeMesh.rotation.y = -0.15 * elapsedTime;
	torusMesh.rotation.y = 0.15 * elapsedTime;
	sphereMesh.position.y = Math.sin(elapsedTime) * 0.5;
}

tick()