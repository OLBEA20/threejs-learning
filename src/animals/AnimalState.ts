import { Animal } from "./Animal";
import { World } from "../world/World";

export interface AnimalState {
    update: (animal: Animal, world: World) => AnimalState;
}
