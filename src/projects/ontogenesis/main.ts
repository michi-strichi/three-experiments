import * as THREE from "three";
import * as CANNON from "cannon-es";
import { initFunction } from "../types";

class Cell extends THREE.Mesh {

	radius = 1

	constructor(geo: THREE.BufferGeometry, mat: THREE.Material) {
		super(geo, mat)
	}

	divide(direction: THREE.Vector3) {
		if (!(this.material instanceof THREE.Material)) return;
		const newCell = new Cell(this.geometry, this.material)
		
		newCell.position.y = 2;
		this.add(newCell)
	}

	// spawn(pos: THREE.Vector3) {
	// 	const newCell = new THREE.Mesh(

	// 	)
	// 	newCell.position.copy(pos)
	// 	this.object3D.add(newCell)
	// }

}

const init: initFunction = async (renderer, scene, camera) => {

	const cell = new Cell(
		new THREE.SphereGeometry(1),
		new THREE.MeshLambertMaterial({ color: "red" })
	);
	cell.divide(new THREE.Vector3)

	scene.add(cell)

	return () => { }
}

export default init