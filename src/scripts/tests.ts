import * as THREE from "three";
import * as CANNON from "cannon-es";


export const init = (_scene: THREE.Scene, _envMap: THREE.Texture) => {

    const world = new CANNON.World();

    // constants
    const NUM_EGGS = 30;
    const ORIGIN = new CANNON.Vec3(0, 0, 0);
    var G = 0.1;

    // dummy stuff
    const dummyVector = new CANNON.Vec3();

    const eggs = new Array<{ mesh: THREE.Mesh, body: CANNON.Body }>;

    for (let i = 0; i < NUM_EGGS; i++) {
        const egg = createEgg(_envMap);
        eggs.push(egg);

        _scene.add(egg.mesh);
        world.addBody(egg.body);
    }

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

        eggs.forEach(egg => {
            egg.mesh.position.set(egg.body.position.x, egg.body.position.y, egg.body.position.z)
        })

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

    const size = Math.random() * 0.2 + 1;
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

    // body

    const body = new CANNON.Body({
        shape: new CANNON.Sphere(size),
        position: new CANNON.Vec3(pos.x, pos.y, pos.z),
        mass: 5,
        linearDamping: 0.5
    })

    return { mesh, body };

}
