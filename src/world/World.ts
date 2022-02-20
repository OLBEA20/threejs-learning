import { Animal } from "../animals/Animal";

export class World {
    animals: Animal[];
    dimensions: [number, number];

    constructor(animals: Animal[], dimensions: [number, number]) {
        this.animals = animals;
        this.dimensions = dimensions;
    }

    areAnimalsCloseTo(animal: Animal, radius: number): boolean {
        return this.animals.filter((a) => a !== animal).some((a) => a.isCloseTo(animal, radius));
    }
}
