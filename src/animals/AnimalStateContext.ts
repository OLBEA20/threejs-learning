import { Animal } from "./Animal";
import { AnimalState } from "./AnimalState";
import { World } from "../world/World";

export class AnimalStateContext {
    state: AnimalState;
    animal: Animal;

    constructor(initalState: AnimalState, animal: Animal) {
        this.state = initalState;
        this.animal = animal;
    }

    setState(state: AnimalState) {
        this.state = state;
    }

    update(world: World) {
        this.state = this.state.update(this.animal, world);
    }
}
