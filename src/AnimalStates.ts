import { Vector3 } from "three";
import { Animal } from "./Animal";
import { AnimalState } from "./AnimalState";
import { World } from "./World";

export class MovingState implements AnimalState {
    destination: Vector3;

    constructor(destination: Vector3) {
        this.destination = destination;
    }

    update(animal: Animal, world: World) {
        if (animal.isAt(this.destination)) {
            return new DecidingNewDestinationState();
        }
        if (world.areAnimalsCloseTo(animal, 50)) {
            return new FreezeState();
        }

        const delta = animal.deltaFrom(this.destination).multiplyScalar(-1);
        const xMovement = delta.x > 1 ? 1 : delta.x < -1 ? -1 : delta.x;
        const zMovement = delta.z > 1 ? 1 : delta.z < -1 ? -1 : delta.z;
        try {
            animal.move(new Vector3(xMovement, 0, zMovement));
        } catch {
            return new FreezeState();
        }
        return this;
    }
}

export class DecidingNewDestinationState implements AnimalState {
    update() {
        return new MovingState(newDestination());
    }
}

function newDestination() {
    return new Vector3(
        Math.random() * 16000 - 8000,
        0,
        Math.random() * 16000 - 8000
    );
}

export class FreezeState implements AnimalState {
    constructor() {
        console.log("Freeze!!!");
    }

    update() {
        return this;
    }
}
