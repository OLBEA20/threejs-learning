import { CylinderGeometry } from "three";
import { AnimalSpawner } from "./AnimalSpawner";
import { getAliveMaterial } from "./materials/alive";

export function initializeAnimalSpawner(worldSize: number) {
    const animalGeometry = new CylinderGeometry(10, 10, 30, 8, 1);
    const animalMaterial = getAliveMaterial();

    return new AnimalSpawner(animalGeometry, animalMaterial, worldSize);
}
