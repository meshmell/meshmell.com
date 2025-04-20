import { CameraStatusType } from "@/src/types/camera";

export type viewTypes = "perspective" | "vertical" | "horizontal";

export type WindowType =
  | "windowWidth_smartPhone"
  | "windowWidth_tablet"
  | "windowWidth_pc";

type PositionPlusModel = {
  x: number;
  y: number;
  z: number;
};

type CameraStatusTypeForFocus = {
  positionPlusModel: PositionPlusModel;
  rotation: [number, number, number];
};

export type WindowWidthConfig = {
  cameraStatusForList: CameraStatusType;
  cameraStatusForFocus: CameraStatusTypeForFocus;
  stepSize: number;
  rightColumnX: number;
  leftColumnX: number;
  calculateX: any;
  calculateY: any;
  calculateZ: any;
  columnNumberOfWindow: number;
  cameraPositionYForTheEndView?: number;
};

export type WindowWidthType = {
  windowWidth_smartPhone: WindowWidthConfig;
  windowWidth_tablet: WindowWidthConfig;
  windowWidth_pc: WindowWidthConfig;
};

export type EachViewObjType = {
  slug: string;
  name: {
    en: string;
    ja: string;
  };
  windowWidths: WindowWidthType;
};
