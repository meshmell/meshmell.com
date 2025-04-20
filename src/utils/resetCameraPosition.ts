import { CameraStatusType } from "@/src/types/camera";

export const resetCameraPosition = (
  camera: THREE.Camera,
  savedCameraStatus: CameraStatusType,
): void => {
  camera.position.x = savedCameraStatus.position[0];
  camera.position.y = savedCameraStatus.position[1];
  camera.position.z = savedCameraStatus.position[2];
  camera.rotation.x = savedCameraStatus.rotation[0];
  camera.rotation.y = savedCameraStatus.rotation[1];
  camera.rotation.z = savedCameraStatus.rotation[2];
};
