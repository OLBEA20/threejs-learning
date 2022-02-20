import { ColorRepresentation, Material, MeshPhongMaterial } from "three";

export function buildMaterial(color: ColorRepresentation): Material {
    return new MeshPhongMaterial({ color, flatShading: true });
}
