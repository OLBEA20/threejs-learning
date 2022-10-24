import { CameraControls } from "./CameraControls";

export function updateCameraInfo(controls: CameraControls) {
    const info = controls.info();

    document.getElementById("speed").textContent = `Speed: ${info.speed.toString()}`;
    document.getElementById("position").textContent = `Position: ${info.position
        .toArray()
        .map((coordinate) => coordinate.toFixed(0))}`;
    document.getElementById("rotation").textContent = `Rotation: ${info.rotation
        .toArray()
        .map((r) => (isNaN(Number(r)) ? r : Number(r).toFixed(2)))}`;
}

export function buildCameraInfoElement(): HTMLElement {
    const cameraInformationContainer = document.createElement("div")

    const sectionTitle = document.createElement("h3")
    sectionTitle.textContent = "Camera Information"
    cameraInformationContainer.appendChild(sectionTitle)
    cameraInformationContainer.className = "cameraInfoContainer"


    const speedElement = document.createElement("li");
    speedElement.className = "cameraInfoItem";
    speedElement.id = "speed";

    const positionElement = document.createElement("li");
    positionElement.className = "cameraInfoItem";
    positionElement.id = "position";

    const rotationElement = document.createElement("li");
    rotationElement.className = "cameraInfoItem";
    rotationElement.id = "rotation";

    const container = document.createElement("ul");
    container.className = "cameraInfoList"
    container.appendChild(speedElement);
    container.appendChild(positionElement);
    container.appendChild(rotationElement);

    cameraInformationContainer.appendChild(container)

    return cameraInformationContainer;
}
