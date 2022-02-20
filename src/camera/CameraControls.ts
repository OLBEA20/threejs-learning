import { Camera, Vector3, Quaternion, Euler } from "three";

const ROTATION_ANGLE = Math.PI / 32;

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
            const cameraRotation = new Quaternion().setFromEuler(this.camera.rotation);
            this.camera.position.add(
                translation.clone().applyQuaternion(cameraRotation).multiplyScalar(this.speedFactor)
            );
        }
    }

    rotate(event: KeyboardEvent) {
        if (event.key === "ArrowRight") {
            this.camera.rotateOnWorldAxis(new Vector3(0, 1, 0), -ROTATION_ANGLE);
        } else if (event.key === "ArrowLeft") {
            this.camera.rotateOnWorldAxis(new Vector3(0, 1, 0), ROTATION_ANGLE);
        } else if (event.key === "ArrowDown") {
            this.camera.rotateX(-ROTATION_ANGLE);
        } else if (event.key === "ArrowUp") {
            this.camera.rotateX(ROTATION_ANGLE);
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

    info(): CameraInfo {
        return {
            speed: this.speedFactor,
            position: this.camera.position,
            rotation: this.camera.rotation,
        };
    }
}

export interface CameraInfo {
    speed: number;
    position: Vector3;
    rotation: Euler;
}
