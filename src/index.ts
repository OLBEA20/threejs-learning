import {
    AmbientLight,
    Color,
    DirectionalLight,
    DoubleSide,
    FogExp2,
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
    Scene,
    WebGLRenderer,
} from "three";
import { Animal } from "./animals/Animal";
import { AnimalStateContext } from "./animals/AnimalStateContext";
import { DecidingNewDestinationState } from "./animals/AnimalStates";
import { initializeAnimalSpawner } from "./animals/initialize";
import { CameraControls } from "./camera/CameraControls";
import { updateCameraInfo } from "./camera/cameraInfo";
import { initializeCamera } from "./camera/initialiaze";
import { initializeHud } from "./hud/initialize";

import "./index.css";
import { World } from "./world/World";

const WORLD_SIZE = 16000;
const NUMBER_OF_ANIMALS = 300;

function component() {
    initializeHud();

    const animalSpawner = initializeAnimalSpawner(WORLD_SIZE);
    const animalsContext: AnimalStateContext[] = [];
    const animals: Animal[] = [];

    const scene = initializeScene();
    for (let i = 0; i < NUMBER_OF_ANIMALS; i++) {
        const animal = animalSpawner.spawn();
        animals.push(animal);
        animalsContext.push(new AnimalStateContext(new DecidingNewDestinationState(), animal));
        animal.addTo(scene);
    }

    const camera = initializeCamera();
    const renderer = initializeRenderer();
    const controls = new CameraControls(camera, renderer.domElement);

    const world = new World(animals, [WORLD_SIZE, WORLD_SIZE]);
    function animate() {
        requestAnimationFrame(animate);
        updateCameraInfo(controls);

        animalsContext.forEach((animal) => animal.update(world));

        renderer.render(scene, camera);
    }

    animate();
}

component();

function initializeScene() {
    const scene = new Scene();
    scene.background = new Color(0x9ce1ff);
    scene.fog = new FogExp2(0x99dbcc, 0.0002);
    scene.add(...buildLights());
    scene.add(buildGround());

    return scene;
}

function buildLights() {
    const dirLight1 = new DirectionalLight(0xffffff);
    dirLight1.position.set(20, 20, 20);

    const dirLight2 = new DirectionalLight(0x002288);
    dirLight2.position.set(-20, -20, -20);

    const ambientLight = new AmbientLight(0x555555);

    return [dirLight1, dirLight2, ambientLight];
}

function buildGround() {
    const planeGeometry = new PlaneGeometry(WORLD_SIZE, WORLD_SIZE);
    const planeMaterial = new MeshBasicMaterial({
        color: 0x00aa00,
        side: DoubleSide,
    });
    const plane = new Mesh(planeGeometry, planeMaterial);
    plane.rotation.set(Math.PI / 2, 0, 0);
    plane.position.set(0, -15, 0);

    return plane;
}

function initializeRenderer() {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    return renderer;
}
