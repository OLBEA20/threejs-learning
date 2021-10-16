import {
    AmbientLight,
    Color,
    CylinderGeometry,
    DirectionalLight,
    DoubleSide,
    FogExp2,
    Mesh,
    MeshBasicMaterial,
    MeshPhongMaterial,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    WebGLRenderer,
} from "three";
import { Animal } from "./Animal";
import { AnimalSpawner } from "./AnimalSpawner";
import { AnimalStateContext } from "./AnimalStateContext";
import { DecidingNewDestinationState } from "./AnimalStates";
import { CameraControls } from "./CameraControls";

import "./index.css";
import { World } from "./World";

function component() {
    const scene = new Scene();
    scene.background = new Color(0x9ce1ff);
    scene.fog = new FogExp2(0x99dbcc, 0.0003);
    scene.add(...buildLights());

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const speedFactorDisplay = document.createElement("div");
    speedFactorDisplay.className = "speedFactorDisplay";
    document.body.appendChild(speedFactorDisplay);

    const camera = new PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        5000
    );
    camera.lookAt(0, 0, 0);
    camera.position.set(400, 200, 0);

    const planeGeometry = new PlaneGeometry(16000, 16000);
    const planeMaterial = new MeshBasicMaterial({
        color: 0x00aa00,
        side: DoubleSide,
    });
    const plane = new Mesh(planeGeometry, planeMaterial);
    plane.rotation.set(Math.PI / 2, 0, 0);
    plane.position.set(0, -15, 0);

    scene.add(plane);

    const controls = new CameraControls(camera, renderer.domElement);

    const animalGeometry = new CylinderGeometry(10, 10, 30, 8, 1);
    const animalMaterial = new MeshPhongMaterial({
        color: 0x0000ff,
        flatShading: true,
    });

    const animalSpawner = new AnimalSpawner(animalGeometry, animalMaterial);
    const animalsContext: AnimalStateContext[] = [];
    const animals: Animal[] = [];
    for (let i = 0; i < 300; i++) {
        const animal = animalSpawner.spawn();
        animals.push(animal);
        animalsContext.push(
            new AnimalStateContext(new DecidingNewDestinationState(), animal)
        );
        scene.add(animal.mesh);
    }
    const world = new World(animals);

    function animate() {
        requestAnimationFrame(animate);
        speedFactorDisplay.textContent = `Speed: ${controls.speedFactor.toString()} Position: ${camera.position.toArray()} Rotation: ${camera.rotation
            .toArray()
            .map((r) => (isNaN(Number(r)) ? r : Number(r).toFixed(2)))}`;

        animalsContext.forEach((animal) => animal.update(world));

        renderer.render(scene, camera);
    }

    animate();
}

component();

function buildLights() {
    const dirLight1 = new DirectionalLight(0xffffff);
    dirLight1.position.set(20, 20, 20);

    const dirLight2 = new DirectionalLight(0x002288);
    dirLight2.position.set(-20, -20, -20);

    const ambientLight = new AmbientLight(0x555555);

    return [dirLight1, dirLight2, ambientLight];
}
