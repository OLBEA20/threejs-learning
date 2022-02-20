import { Material } from "three";
import { buildMaterial } from "./buildMaterial";

export function getAliveMaterial(): Material {
    return buildMaterial(0x0000ff);
}
