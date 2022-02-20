import { BufferGeometry, Material, Mesh } from "three";
import { generatePosition } from "../commons/generatePosition";
import { Animal } from "./Animal";

export class AnimalSpawner {
    geometry: BufferGeometry;
    material: Material;
    worldSize: number;

    constructor(geometry: BufferGeometry, material: Material, worldSize: number) {
        this.geometry = geometry;
        this.material = material;
        this.worldSize = worldSize;
    }

    spawn(): Animal {
        const mesh = new Mesh(this.geometry, this.material);
        mesh.position.set(...generatePosition(this.worldSize, this.worldSize).toArray());
        return new Animal(mesh, generateEnergy(2000));
    }
}

function generateEnergy(maxEnergy: number) {
    return Math.floor(Math.random() * maxEnergy);
}
