import { useRef } from "react";
import * as THREE from "three";

import { LightAndDarkThemeType } from "@/src/types/lightAndDarkTheme";

type DirectionalLightType = {
  lightAndDarkTheme: LightAndDarkThemeType;
};

const DirectionalDirectionalLightForScene = ({
  lightAndDarkTheme,
}: DirectionalLightType) => {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  let position: [number, number, number];
  let intensity: number;
  let color: string;
  let shadowMapSizeWidth: number;
  let shadowMapSizeHeight: number;
  let shadowCameraLeft: number;
  let shadowCameraRight: number;
  let shadowCameraTop: number;
  let shadowCameraBottom: number;
  let ambientIntensity: number;

  switch (lightAndDarkTheme) {
    case "light":
      position = [10, 20, 10];
      intensity = 3;
      color = "white";
      shadowMapSizeWidth = 512;
      shadowMapSizeHeight = 512;
      shadowCameraLeft = -100;
      shadowCameraRight = 100;
      shadowCameraTop = 100;
      shadowCameraBottom = -100;
      ambientIntensity = 3;
      break;
    case "dark":
      position = [20, 20, 10];
      intensity = 3;
      color = "white";
      shadowMapSizeWidth = 512;
      shadowMapSizeHeight = 512;
      shadowCameraLeft = -100;
      shadowCameraRight = 100;
      shadowCameraTop = 100;
      shadowCameraBottom = -100;
      ambientIntensity = 3;
      break;
    default:
      position = [20, 20, 10];
      intensity = 4;
      color = "lightblue";
      shadowMapSizeWidth = 512;
      shadowMapSizeHeight = 512;
      shadowCameraLeft = -100;
      shadowCameraRight = 100;
      shadowCameraTop = 100;
      shadowCameraBottom = -100;
      ambientIntensity = 4;
      break;
  }

  return (
    <>
      <directionalLight
        ref={lightRef}
        position={position}
        intensity={intensity}
        color={color}
        castShadow
        shadow-radius={50}
        shadow-mapSize-width={shadowMapSizeWidth}
        shadow-mapSize-height={shadowMapSizeHeight}
        shadow-camera-left={shadowCameraLeft}
        shadow-camera-right={shadowCameraRight}
        shadow-camera-top={shadowCameraTop}
        shadow-camera-bottom={shadowCameraBottom}
      />
      <ambientLight intensity={ambientIntensity} />
    </>
  );
};

export default DirectionalDirectionalLightForScene;
