import { Material } from "three";
import { buildMaterial } from "./buildMaterial";

export function getDeathMaterial(): Material {
    return buildMaterial(0xff0000);
}
