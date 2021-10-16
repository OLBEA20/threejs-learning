import { Vector3 } from "three";
import { Animal } from "./Animal";

export class World {
    animals: Animal[];

    constructor(animals: Animal[]) {
        this.animals = animals;
    }

    areAnimalsCloseTo(animal: Animal, radius: number): boolean {
        return this.animals
            .filter((a) => a !== animal)
            .some((a) => a.isCloseTo(animal, radius));
    }
}
