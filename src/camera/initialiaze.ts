import { PerspectiveCamera } from "three";

export function initializeCamera() {
    const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
    camera.lookAt(0, 0, 0);
    camera.position.set(400, 200, 0);

    return camera;
}
