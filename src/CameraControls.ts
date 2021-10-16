import { Camera, Vector3 } from "three";

const TRANSLATION_CONTROLS: Record<string, Vector3> = {
    w: new Vector3(0, 0, -1),
    s: new Vector3(0, 0, 1),
    d: new Vector3(1, 0, 0),
    a: new Vector3(-1, 0, 0),
};

export class CameraControls {
    camera: Camera;
    speedFactor: number;
    domElement: HTMLCanvasElement;

    constructor(camera: Camera, domElement: HTMLCanvasElement) {
        this.camera = camera;
        this.speedFactor = 10;
        this.domElement = domElement;
        window.addEventListener("keydown", (event: KeyboardEvent) => {
            this.move(event);
            this.rotate(event);
            this.changeSpeed(event);
        });
    }

    move(event: KeyboardEvent) {
        const translation = TRANSLATION_CONTROLS[event.key];
        if (translation) {
            this.camera.position.add(
                translation.clone().multiplyScalar(this.speedFactor)
            );
        }
    }

    rotate(event: KeyboardEvent) {
        if (event.key === "ArrowRight") {
            this.camera.rotateY(-Math.PI / 8);
        } else if (event.key === "ArrowLeft") {
            this.camera.rotateY(Math.PI / 8);
        } else if (event.key === "ArrowDown") {
            this.camera.rotateX(Math.PI / 8);
        } else if (event.key === "ArrowUp") {
            this.camera.rotateX(-Math.PI / 8);
        }
    }

    changeSpeed(event: KeyboardEvent) {
        if (event.key === "e") {
            this.speedFactor += 1;
        } else if (event.key === "q") {
            this.speedFactor -= 1;
        }
        this.speedFactor = Math.min(50, Math.max(0, this.speedFactor));
    }
}
