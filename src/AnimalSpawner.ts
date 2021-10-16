import { BufferGeometry, Material, Mesh, Vector3 } from "three";
import { Animal } from "./Animal";

export class AnimalSpawner {
    geometry: BufferGeometry;
    material: Material;

    constructor(geometry: BufferGeometry, material: Material) {
        this.geometry = geometry;
        this.material = material;
    }

    spawn(): Animal {
        const mesh = new Mesh(this.geometry, this.material);
        mesh.position.set(
            Math.random() * 16000 - 8000,
            0,
            Math.random() * 16000 - 8000
        );
        return new Animal(mesh);
    }
}
