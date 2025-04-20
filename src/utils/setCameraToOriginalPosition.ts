import gsap from "gsap";

import { CameraStatusType } from "@/src/types/camera";

export const setCameraToOriginalPosition = (
  camera: THREE.Camera,
  cameraStatus: CameraStatusType,
  animation: boolean,
): void => {
  if (animation) {
    gsap.to(camera.position, {
      x: cameraStatus.position[0],
      y: cameraStatus.position[1],
      z: cameraStatus.position[2],
      duration: 1,
      ease: "power3.out",
    });
    gsap.to(camera.rotation, {
      x: cameraStatus.rotation[0],
      y: cameraStatus.rotation[1],
      z: cameraStatus.rotation[2],
      duration: 1,
      ease: "power3.out",
    });
  } else {
    camera.position.set(
      cameraStatus.position[0],
      cameraStatus.position[1],
      cameraStatus.position[2],
    );
    camera.rotation.set(
      cameraStatus.rotation[0],
      cameraStatus.rotation[1],
      cameraStatus.rotation[2],
    );
  }
};
