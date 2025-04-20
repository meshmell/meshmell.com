import gsap from "gsap";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Camera } from "three";

import { CameraStatusType } from "@/src/types/camera";
import { WindowType } from "@/src/types/views";
import { views } from "@/src/utils/views/index";

type CameraControllerType = {
  camera: Camera;
  enabled: boolean;
  theNumberOfModel: number;
  setSavedCameraStatus: Dispatch<SetStateAction<CameraStatusType>>;
  windowType: WindowType;
  isFocusedMode: boolean;
};

export const CameraControllerPerspective = ({
  camera,
  enabled,
  theNumberOfModel,
  setSavedCameraStatus,
  windowType,
  isFocusedMode,
}: CameraControllerType) => {
  const stepSize =
    views.find((view) => view.slug === "perspective")?.windowWidths[windowType]
      .stepSize ?? 0;
  const perspectiveView = views.find((view) => view.slug === "perspective");
  const maxZ = perspectiveView
    ? perspectiveView.windowWidths[windowType].cameraStatusForList.position[2]
    : 0;
  const toNextEven = (num: number): number => (num % 2 !== 0 ? num + 1 : num);
  const cameraPositionYForTheEndView =
    perspectiveView?.windowWidths[windowType].cameraPositionYForTheEndView ?? 0;
  const minZ =
    -stepSize * (toNextEven(theNumberOfModel) / 2 - 1) +
    maxZ -
    cameraPositionYForTheEndView;
  let startTouch = 0;

  const updateCameraPosition = (newPositionZ: number) => {
    if (theNumberOfModel === 0) return;

    newPositionZ = Math.max(minZ, Math.min(newPositionZ, maxZ));

    gsap
      .to(camera.position, {
        z: newPositionZ,
        duration: 0.5,
        ease: "power3.out",
      })
      .then(() => {
        if (isFocusedMode) return;

        if (
          camera.position.x !==
          perspectiveView?.windowWidths[windowType].cameraStatusForList
            .position[0]
        )
          return;

        if (
          camera.position.y !==
          perspectiveView?.windowWidths[windowType].cameraStatusForList
            .position[1]
        )
          return;
        setSavedCameraStatus({
          position: [camera.position.x, camera.position.y, camera.position.z],
          rotation: [camera.rotation.x, camera.rotation.y, camera.rotation.z],
        });
      });
  };

  const handleWheel = (event: any) => {
    const scale = 0.05;
    const newPositionZ = camera.position.z + event.deltaY * scale;
    updateCameraPosition(newPositionZ);
  };

  const handleTouchStart = (event: TouchEvent) => {
    startTouch = event.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    startTouch = 0;

    gsap.to(
      {},
      {
        duration: 0.1,
      },
    );
  };

  const handleTouchMove = (event: TouchEvent) => {
    const endTouch = event.touches[0].clientY;
    const distanceMoved = startTouch - endTouch;
    const scale = 0.08;
    const newPositionZ = camera.position.z + distanceMoved * scale;
    updateCameraPosition(newPositionZ);
  };

  useEffect(() => {
    if (enabled) {
      window.addEventListener("wheel", handleWheel);
      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [camera, enabled, minZ, maxZ]);

  return null;
};

export default CameraControllerPerspective;
