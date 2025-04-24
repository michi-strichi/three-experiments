import * as THREE from "three";
import * as CANNON from "cannon-es";
import { initFunction } from "../types";

export const init: initFunction = async (_renderer: THREE.WebGLRenderer, _scene: THREE.Scene, _camera: THREE.Camera) => {

    // envmap
    const textureLoader = new THREE.TextureLoader();
    const cubeMap = await textureLoader.loadAsync("/cubemap.jpg") as THREE.CubeTexture;
    const generator = new THREE.PMREMGenerator(_renderer);
    const envMap = generator.fromCubemap(cubeMap).texture;

    const world = new CANNON.World();

    // constants
    const NUM_EGGS = 30;
    const ORIGIN = new CANNON.Vec3(0, 0, 0);
    var G = 0.5;

    // dummy stuff
    const dummyVector = new CANNON.Vec3();

    const eggs = new Array<{ mesh: THREE.Mesh, body: CANNON.Body }>;

    for (let i = 0; i < NUM_EGGS; i++) {
        const egg = createEgg(envMap);
        egg.mesh.userData.ID = i;
        eggs.push(egg);

        _scene.add(egg.mesh);
        world.addBody(egg.body);
    }

    // raycasting

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    document.querySelector("canvas")?.addEventListener("pointerdown", (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, _camera);
        const intersects = raycaster.intersectObjects(eggs.map(egg => egg.mesh), false);

        if (intersects[0]) {
            const eggMesh = intersects[0].object;
            const eggBody = eggs[eggMesh.userData.ID].body;
            dummyVector.copy(eggBody.position)
            const forceVec = dummyVector.vsub(new CANNON.Vec3(_camera.position.x, _camera.position.y, _camera.position.z))
            eggBody.applyImpulse(forceVec.scale(10));
        }
    })

    const update = () => {
        eggs.forEach(egg => {
            dummyVector.copy(ORIGIN);
            const r = dummyVector.vsub(egg.body.position);
            const distance = Math.max(r.length(), 1);
            const forceMagnitude = G * (1000 * egg.body.mass) / Math.pow(distance, 2);
            r.normalize()
            const force = r.scale(forceMagnitude);
            egg.body.applyForce(force, egg.body.position);
        })

        world.step(1 / 60)
        eggs.forEach(egg => egg.mesh.position.set(
            egg.body.position.x,
            egg.body.position.y,
            egg.body.position.z)
        );
    }

    return update;
}

export default init;

const createEgg = (envMap: THREE.Texture) => {
    const spread = 10;
    const x = Math.random() * spread - spread / 2;
    const y = Math.random() * spread - spread / 2;
    const z = Math.random() * spread - spread / 2;
    const pos = new THREE.Vector3(x, y, z);
    const size = Math.random() * 0.1 + 1;

    // mesh
    const geo = new THREE.SphereGeometry();
    const mat = new THREE.MeshPhysicalMaterial({
        color: "white",
        transmission: 1,
        roughness: 0.2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMap: envMap
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.setScalar(size);
    mesh.position.copy(pos);
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    // body
    const body = new CANNON.Body({
        shape: new CANNON.Sphere(size),
        position: new CANNON.Vec3(pos.x, pos.y, pos.z),
        mass: 5,
        linearDamping: 0.5
    })

    return { mesh, body };
}
