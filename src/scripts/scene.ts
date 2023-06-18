import * as THREE from "three";
import * as CANNON from "cannon-es";

import Stats from 'three/examples/jsm/libs/stats.module.js';

export default function init() {

    const canvas = document.querySelector("canvas");

    const stats = new Stats();
    document.body.appendChild(stats.dom);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas!, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(0, 0, 10);

    const mesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: "red" }));
    scene.add(mesh);

    const onWindowResize = () => {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    window.addEventListener('resize', onWindowResize);

    const render = () => {

        // stuff

        mesh.rotation.y += 0.01;
        mesh.rotation.z += 0.015;
        mesh.rotation.x += 0.02;

        renderer.render(scene, camera);

    }

    const animate = () => {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }

    animate();
}


