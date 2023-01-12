import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Setup
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer ({
  canvas: document.getElementById('bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

// Creating Torus Object (unused)
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
// const material = new THREE.MeshStandardMaterial({color: 0xFF6347} )
// const torus = new THREE.Mesh(geometry, material)
// scene.add(torus)


// Creating a light for the scene
const pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.set(8, 7, 10)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0x444444)
scene.add(ambientLight)

// Helpers
// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(pointLightHelper, gridHelper);

// Settting the orbital controls
const controls = new OrbitControls(camera, renderer.domElement)


// function to randomly place star in the scene
function addStar() {
  const geometry = new THREE.SphereGeometry(0.05, 24, 24)
  const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

// Background Texture
// const spaceTexture = new THREE.TextureLoader().load('space.jpg')
// scene.background = spaceTexture

const earthTexture = new THREE.TextureLoader().load('earth.jpg')
const earthNormalTexture = new THREE.TextureLoader().load('earth_normal.jpg')

// Creating Earth element
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(5, 64, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthNormalTexture
  })
)

scene.add(earth)

const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const moonNormalTexture = new THREE.TextureLoader().load('normal.jpg')

// Creating Moon element
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormalTexture
  })
)

scene.add(moon)
moon.position.set(10, 0, 10)

// function to animate and render 
function animate() {
  requestAnimationFrame(animate)

  // unused
  // torus.rotation.x += 0.03
  // torus.rotation.y += 0.01
  // torus.rotation.z += 0.03

  earth.rotation.x += 0.015
  earth.rotation.y += 0.005
  earth.rotation.z += 0.015

  moon.rotation.x += 0.015
  moon.rotation.y += 0.005
  moon.rotation.z += 0.015


  controls.update()

  renderer.render(scene, camera)
}

animate()
