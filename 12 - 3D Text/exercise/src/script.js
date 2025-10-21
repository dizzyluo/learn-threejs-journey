import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import {FontLoader, TextGeometry} from 'three/addons';
import {TextureLoader} from 'three'
/**
 * Base
 */
// Debug
const gui = new GUI()


/**
 * Fonts
 */
const fontLoader = new FontLoader();
fontLoader.load('/fonts/Headline R_Regular.json', (font) => {
	const textGeometry = new TextGeometry(
		'DEZHANG', {
			font: font,
			size: 0.5,
			depth: 0.2,
			curveSegments: 32,
			bevelEnabled: true,
			bevelThickness: 0.03,
			bevelSize: 0.02,
			bevelOffset: 0,
			bevelSegments: 2
		})
	
  
  textGeometry.computeBoundingBox()
  console.log( textGeometry.boundingBox );
  // textGeometry.translate(
  //   textGeometry.boundingBox.max.x * -0.5,
  //   textGeometry.boundingBox.max.y * -0.5,
  //   textGeometry.boundingBox.max.z * -0.5
  // )
  textGeometry.center();

  const textTexture = textureLoader.load('textures/matcaps/1.png');
  textTexture.colorSpace = THREE.SRGBColorSpace;
  
  const textMaterial = new THREE.MeshMatcapMaterial({
    matcap: textTexture
  });
  // textMaterial.matcap = textTexture;
  // const textMaterial = new THREE.MeshBasicMaterial();
	// textMaterial.color = new THREE.Color(0xff0000);
	// textMaterial.wireframe = true;
	
  
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
	scene.add(textMesh)
  
  
  //
  const donutTexture = textureLoader.load('textures/matcaps/8.png');
  donutTexture.colorSpace = THREE.SRGBColorSpace;
  
  const donutGeom = new THREE.TorusGeometry(.3, .2, 20, 45);
  const donutMat = new THREE.MeshMatcapMaterial({
    matcap: donutTexture,
  })
  for (var i = 0; i < 100; i++) {
    const donutMesh = new THREE.Mesh(donutGeom, donutMat);
    donutMesh.position.x = (Math.random() - 0.5) * 10
    donutMesh.position.y = (Math.random() - 0.5) * 10
    donutMesh.position.z = (Math.random() - 0.5) * 10
    donutMesh.rotation.x = Math.random() * Math.PI;
    donutMesh.rotation.y = Math.random() * Math.PI;
    const scale = Math.random() * 0.5 + 0.5
    donutMesh.scale.set(scale, scale, scale)
    // donutMesh.position.y = textGeometry.boundingBox.min.y - Math.random() * 10 - 0.2
    // donutMesh.position.z = textGeometry.boundingBox.min.z - Math.random() * 10 - 0.2
    
    scene.add(donutMesh);
  }
	
})


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Object
 */
const cube = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial()
)

// scene.add(cube)

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
}

tick()