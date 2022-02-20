import { Vector3 } from "three";
import { Animal, NoMoreEnergy } from "./Animal";
import { AnimalState } from "./AnimalState";
import { World } from "../world/World";
import { generatePosition } from "../commons/generatePosition";

export class MovingState implements AnimalState {
    destination: Vector3;

    constructor(destination: Vector3) {
        this.destination = destination;
    }

    update(animal: Animal, world: World): AnimalState {
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
        } catch (error) {
            if (error instanceof NoMoreEnergy) {
                return new FreezeState();
            }
        }
        return this;
    }
}

export class DecidingNewDestinationState implements AnimalState {
    update(_: Animal, world: World) {
        return new MovingState(generatePosition(...world.dimensions));
    }
}

export class FreezeState implements AnimalState {
    constructor() {}

    update(animal: Animal) {
        animal.kill();
        return this;
    }
}
