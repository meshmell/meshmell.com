import { EachViewObjType } from "../../types/views";

export const views: EachViewObjType[] = [
  {
    slug: "perspective",
    name: {
      en: "Depth scroll",
      ja: "奥行きスクロール",
    },
    windowWidths: {
      windowWidth_smartPhone: {
        cameraStatusForList: {
          position: [0, 8, 14],
          rotation: [-0.5, 0, 0],
        },
        cameraPositionYForTheEndView: 6,
        cameraStatusForFocus: {
          positionPlusModel: {
            x: 0,
            y: 8,
            z: 10,
          },
          rotation: [-0.5, 0, 0],
        },
        stepSize: 10,
        leftColumnX: -3,
        rightColumnX: 3,
        calculateX: (
          index: number,
          leftColumnX: number,
          rightColumnX: number,
        ) => (index % 2 === 0 ? leftColumnX : rightColumnX),
        calculateY: () => 0,
        calculateZ: (index: number, stepSize: number) =>
          Math.floor(index / 2) * -stepSize,
        columnNumberOfWindow: 4,
      },
      windowWidth_tablet: {
        cameraStatusForList: {
          position: [0, 8, 8],
          rotation: [-0.5, 0, 0],
        },
        cameraStatusForFocus: {
          positionPlusModel: {
            x: 0,
            y: 5,
            z: 8,
          },
          rotation: [-0.5, 0, 0],
        },
        stepSize: 10,
        leftColumnX: -3,
        rightColumnX: 3,
        calculateX: (
          index: number,
          leftColumnX: number,
          rightColumnX: number,
        ) => (index % 2 === 0 ? leftColumnX : rightColumnX),
        calculateY: () => 0,
        calculateZ: (index: number, stepSize: number) =>
          Math.floor(index / 2) * -stepSize,
        columnNumberOfWindow: 4,
      },
      windowWidth_pc: {
        cameraStatusForList: {
          position: [0, 8, 8],
          rotation: [-0.5, 0, 0],
        },
        cameraStatusForFocus: {
          positionPlusModel: {
            x: 0,
            y: 4,
            z: 6.5,
          },
          rotation: [-0.5, 0, 0],
        },
        stepSize: 10,
        leftColumnX: -3,
        rightColumnX: 3,
        calculateX: (
          index: number,
          leftColumnX: number,
          rightColumnX: number,
        ) => (index % 2 === 0 ? leftColumnX : rightColumnX),
        calculateY: () => 0,
        calculateZ: (index: number, stepSize: number) =>
          Math.floor(index / 2) * -stepSize,
        columnNumberOfWindow: 4,
      },
    },
  },
  {
    slug: "vertical",
    name: {
      en: "Vertical scroll",
      ja: "縦スクロール",
    },
    windowWidths: {
      windowWidth_smartPhone: {
        cameraStatusForList: {
          position: [20, -5, 0],
          rotation: [0, Math.PI / 2, 0],
        },
        cameraStatusForFocus: {
          positionPlusModel: {
            x: 10,
            y: 8,
            z: 0,
          },
          rotation: [-0.5, 0, 0],
        },
        stepSize: 7,
        leftColumnX: -3,
        rightColumnX: 3,
        calculateX: () => 0,
        calculateY: (index: number, stepSize: number) =>
          Math.floor(index / 2) * -stepSize,
        calculateZ: (
          index: number,
          leftColumnX: number,
          rightColumnX: number,
        ) => (index % 2 === 0 ? rightColumnX : leftColumnX),
        columnNumberOfWindow: 3,
      },
      windowWidth_tablet: {
        cameraStatusForList: {
          position: [20, -4, 0],
          rotation: [0, Math.PI / 2, 0],
        },
        cameraStatusForFocus: {
          positionPlusModel: {
            x: 8,
            y: 5,
            z: 0,
          },
          rotation: [-0.5, 0, 0],
        },
        stepSize: 7,
        leftColumnX: -4,
        rightColumnX: 4,
        calculateX: () => 0,
        calculateY: (index: number, stepSize: number) =>
          Math.floor(index / 2) * -stepSize,
        calculateZ: (
          index: number,
          leftColumnX: number,
          rightColumnX: number,
        ) => (index % 2 === 0 ? rightColumnX : leftColumnX),
        columnNumberOfWindow: 3,
      },
      windowWidth_pc: {
        cameraStatusForList: {
          position: [15, -4, 0],
          rotation: [0, Math.PI / 2, 0],
        },
        cameraStatusForFocus: {
          positionPlusModel: {
            x: 6.5,
            y: 4,
            z: 0,
          },
          rotation: [-0.5, 0, 0],
        },
        stepSize: 7,
        leftColumnX: -5,
        rightColumnX: 5,
        calculateX: () => 0,
        calculateY: (index: number, stepSize: number) =>
          Math.floor(index / 2) * -stepSize,
        calculateZ: (
          index: number,
          leftColumnX: number,
          rightColumnX: number,
        ) => (index % 2 === 0 ? rightColumnX : leftColumnX),
        columnNumberOfWindow: 2.5,
      },
    },
  },
  {
    slug: "horizontal",
    name: {
      en: "Horizontal scroll",
      ja: "横スクロール",
    },
    windowWidths: {
      windowWidth_smartPhone: {
        cameraStatusForList: {
          position: [18, 1, -4],
          rotation: [0, Math.PI / 2, 0],
        },
        cameraStatusForFocus: {
          positionPlusModel: {
            x: 10,
            y: 8,
            z: 0,
          },
          rotation: [-0.5, 0, 0],
        },
        stepSize: 7,
        leftColumnX: -3,
        rightColumnX: 3,
        calculateX: (
          index: number,
          leftColumnX: number,
          rightColumnX: number,
        ) => (index % 2 === 0 ? leftColumnX : rightColumnX),
        calculateY: () => 0,
        calculateZ: (index: number, stepSize: number) =>
          Math.floor(index / 2) * -stepSize,
        columnNumberOfWindow: 1.3,
      },
      windowWidth_tablet: {
        cameraStatusForList: {
          position: [18, 1, -10],
          rotation: [0, Math.PI / 2, 0],
        },
        cameraStatusForFocus: {
          positionPlusModel: {
            x: 8,
            y: 6,
            z: 0,
          },
          rotation: [-0.5, 0, 0],
        },
        stepSize: 7,
        leftColumnX: -4,
        rightColumnX: 4,
        calculateX: (
          index: number,
          leftColumnX: number,
          rightColumnX: number,
        ) => (index % 2 === 0 ? leftColumnX : rightColumnX),
        calculateY: () => 0,
        calculateZ: (index: number, stepSize: number) =>
          Math.floor(index / 2) * -stepSize,
        columnNumberOfWindow: 3,
      },
      windowWidth_pc: {
        cameraStatusForList: {
          position: [15, 1, -15],
          rotation: [0, Math.PI / 2, 0],
        },
        cameraStatusForFocus: {
          positionPlusModel: {
            x: 6,
            y: 4,
            z: 0,
          },
          rotation: [-0.5, 0, 0],
        },
        stepSize: 8,
        leftColumnX: -4,
        rightColumnX: 4,
        calculateX: (
          index: number,
          leftColumnX: number,
          rightColumnX: number,
        ) => (index % 2 === 0 ? leftColumnX : rightColumnX),
        calculateY: () => 0,
        calculateZ: (index: number, stepSize: number) =>
          Math.floor(index / 2) * -stepSize,
        columnNumberOfWindow: 4.5,
      },
    },
  },
];
