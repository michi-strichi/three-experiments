import * as THREE from "three";
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';
import { initFunction } from "../types";

const init: initFunction = async (_renderer: THREE.WebGLRenderer, _scene: THREE.Scene, _camera: THREE.Camera): Promise<() => void> => {

	const RESULUTION = 10;
	const mat = new THREE.MeshStandardMaterial({ color: "red", side: THREE.DoubleSide });

	const effect = new MarchingCubes(RESULUTION, mat, false, true, 100000);
	effect.position.set(0, 0, 0);
	effect.scale.set(700, 700, 700);
	effect.isolation = 10;
	effect.enableUvs = false;
	effect.enableColors = false;

	effect.init(RESULUTION)
	_scene.add(effect);

	effect.reset();
	effect.addBall(0, 0, 0, 1, 0.5, new THREE.Color("red"));
	effect.addBall(2, 2, 2, 10, 0.5);
	effect.addPlaneX(10, 10)

	effect.update();
	// const mesh = new THREE.Mesh(new THREE.BoxGeometry, new THREE.MeshStandardMaterial({ color: "red" }))
	// _scene.add(mesh);

	return () => {
		effect.reset();
		effect.update();
	}

}

export default init;