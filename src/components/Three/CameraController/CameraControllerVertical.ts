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

export const CameraControllerVertical = ({
  camera,
  enabled,
  theNumberOfModel,
  setSavedCameraStatus,
  windowType,
  isFocusedMode,
}: CameraControllerType) => {
  const columnNumberOfWindow =
    views.find((view) => view.slug === "vertical")?.windowWidths[windowType]
      .columnNumberOfWindow ?? 0;
  const stepSize =
    views.find((view) => view.slug === "vertical")?.windowWidths[windowType]
      .stepSize ?? 0;
  const verticalView = views.find((view) => view.slug === "vertical");
  const maxY = verticalView
    ? verticalView.windowWidths[windowType].cameraStatusForList.position[1]
    : 0;
  const toNextEven = (num: number): number => (num % 2 !== 0 ? num + 1 : num);
  let numNum = toNextEven(theNumberOfModel) / 2 - columnNumberOfWindow;
  numNum = numNum < 0 ? 0 : numNum;
  const minY = -stepSize * numNum + maxY;
  let startTouch = 0;

  const updateCameraPositionY = (newPositionY: number) => {
    newPositionY = Math.max(minY, Math.min(newPositionY, maxY));

    gsap
      .to(camera.position, {
        y: newPositionY,
        duration: 0.5,
        ease: "power3.out",
      })
      .then(() => {
        if (isFocusedMode) return;

        if (
          camera.position.x !==
          verticalView?.windowWidths[windowType].cameraStatusForList.position[0]
        )
          return;

        if (
          camera.position.z !==
          verticalView?.windowWidths[windowType].cameraStatusForList.position[2]
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
    const newPositionY = camera.position.y - event.deltaY * scale;
    updateCameraPositionY(newPositionY);
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
    const newPositionY = camera.position.y - distanceMoved * scale;
    updateCameraPositionY(newPositionY);
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
  }, [camera, enabled, minY, maxY]);

  return null;
};

export default CameraControllerVertical;
