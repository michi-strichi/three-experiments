import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import init from "./amphibian-eggs/main";
import init from "./generative-treehoppers/main";

export default async function setup(canvas: HTMLCanvasElement) {

	const stats = new Stats();
	document.body.appendChild(stats.dom);

	const renderer = new THREE.WebGLRenderer({ canvas: canvas!, antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	const scene = new THREE.Scene();
	scene.background = new THREE.Color("white");

	const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
	camera.position.set(20, 13, 20);

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.update();

	const dLight = new THREE.DirectionalLight();
	dLight.position.set(0, 100, 0);
	scene.add(dLight);

	const aLight = new THREE.AmbientLight(new THREE.Color("white"), 0.1);
	scene.add(aLight);

	const grid = new THREE.GridHelper(50, 20);
	scene.add(grid)

	const updateProject = await init(renderer, scene, camera);

	const update = () => {
		updateProject();
	}

	const animate = () => {
		requestAnimationFrame(animate);
		update();
		stats.update();

		renderer.render(scene, camera);
	}

	const onWindowResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	window.addEventListener('resize', onWindowResize);

	animate();
}
