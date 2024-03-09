import * as THREE from "three";
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';

const init = async (_renderer: THREE.WebGLRenderer, _scene: THREE.Scene, _camera: THREE.Camera) => {

	const RESULUTION = 28;
	const mat = new THREE.MeshStandardMaterial({ color: "red" });

	const effect = new MarchingCubes(RESULUTION, mat, true, true, 100000);
	effect.position.set(0, 0, 0);
	effect.scale.set(700, 700, 700);

	_scene.add(effect);

	effect.addBall(0, 0, 0, 1, 0.5, new THREE.Color("red"));
	effect.update();

	return () => {

	}

}

export default init;