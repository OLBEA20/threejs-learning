import { Mesh, Scene, Vector3 } from "three";
import { getDeathMaterial } from "./materials/death";

export class Animal {
    mesh: Mesh;
    energy: number;
    alive: boolean;

    constructor(mesh: Mesh, energy: number) {
        this.mesh = mesh;
        this.energy = energy;
        this.alive = true;
    }

    move(translation: Vector3) {
        if (this.energy > translation.length()) {
            this.translate(translation);
        } else {
            const adjustedTranslationToEnergy = translation.normalize().multiplyScalar(this.energy);
            this.translate(adjustedTranslationToEnergy);
            throw new NoMoreEnergy();
        }
    }

    private translate(translation: Vector3) {
        this.mesh.translateX(translation.x);
        this.mesh.translateY(translation.y);
        this.mesh.translateZ(translation.z);
        this.energy -= translation.length();
    }

    isAt(position: Vector3) {
        return this.mesh.position.equals(position);
    }

    deltaFrom(position: Vector3) {
        return this.mesh.position.clone().sub(position);
    }

    isCloseTo(animal: Animal, radius: number): boolean {
        return Math.abs(this.deltaFrom(animal.mesh.position).length()) <= radius;
    }

    kill() {
        if (this.alive) {
            this.mesh.material = getDeathMaterial();
        }
        this.alive = false;
    }

    addTo(scene: Scene) {
        scene.add(this.mesh);
    }
}

export class NoMoreEnergy extends Error {
    constructor() {
        super("No more energy");
    }
}
