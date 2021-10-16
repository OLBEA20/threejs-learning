import { Mesh, Vector3 } from "three";

export class Animal {
    mesh: Mesh;
    destination: Vector3;
    energy: number;

    constructor(mesh: Mesh) {
        this.mesh = mesh;
        this.destination = newDestination();
        this.energy = Math.floor(Math.random() * 2000);
    }

    move(translation: Vector3) {
        if (this.energy > translation.length()) {
            this.mesh.translateX(translation.x);
            this.mesh.translateY(translation.y);
            this.mesh.translateZ(translation.z);
            this.energy -= translation.length();
        } else {
            throw "No more energy";
        }
    }

    isAt(position: Vector3) {
        return this.mesh.position.equals(position);
    }

    deltaFrom(position: Vector3) {
        return this.mesh.position.clone().sub(position);
    }

    isCloseTo(animal: Animal, radius: number): boolean {
        return (
            Math.abs(this.deltaFrom(animal.mesh.position).length()) <= radius
        );
    }
}

function newDestination() {
    return new Vector3(
        Math.random() * 16000 - 8000,
        0,
        Math.random() * 16000 - 8000
    );
}
