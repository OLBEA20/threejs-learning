import { Animal } from "./Animal";
import { World } from "./World";

export interface AnimalState {
    update: (animal: Animal, world: World) => AnimalState;
}
