import { Vector3 } from "three";
import { generateCoordinate } from "../commons/generateCoordinate";

export function generatePosition(xRange: number, yRange: number) {
    return new Vector3(generateCoordinate(xRange), 0, generateCoordinate(yRange));
}
