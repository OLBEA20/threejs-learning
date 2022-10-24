import { Animal } from "../animals/Animal";

export class World {
    animals: Animal[];
    dimensions: [number, number];

    constructor(animals: Animal[], dimensions: [number, number]) {
        this.animals = animals;
        this.dimensions = dimensions;
    }

    areAnimalsCloseTo(animal: Animal, radius: number): boolean {
        return this.animals.some((a) => a !== animal && a.isCloseTo(animal, radius));
    }

    stats(): WorldStats {
        return {  
            animalsAliveCount: this.animals.filter((animal) => animal.isAlive()).length,
            animalsDeadCount: this.animals.filter((animal) => !animal.isAlive()).length
        }
    }
}
