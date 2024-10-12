import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const loadingElement = document.getElementById('loading');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff); 
document.body.appendChild(renderer.domElement);

const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(100, 100, 100);
scene.add(light);

const loader = new GLTFLoader();
loadingElement.style.display = 'block'; 

loader.load('../model.glb', (gltf) => {
    scene.add(gltf.scene);
    loadingElement.style.display = 'none'; 
}, undefined, (error) => {
    loadingElement.textContent = 'Yükleme hatası. Lütfen tekrar deneyin.';
    throw new Error('Hata oluştu: ' + error);
});

camera.position.set(0, 2, 5);

const controls = new OrbitControls(camera, renderer.domElement);

const animate = function () {
    requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
};
animate();

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
