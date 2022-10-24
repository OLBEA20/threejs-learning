import { buildCameraInfoElement } from "../camera/cameraInfo";

export function initializeHud() {
    const hud = document.createElement("div");
    hud.className = "hud"; 
    hud.appendChild(buildCameraInfoElement());
    document.body.appendChild(hud);
}
