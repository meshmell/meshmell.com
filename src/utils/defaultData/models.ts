import { ModelDetailsType } from "@/src/types/models";

// "formats": ["glb", "gltf", "fbx", "blend"]
export const defaultModelDetails: ModelDetailsType = {
  slug: "animated_cube",
  resolutions: ["1k"],
  formats: ["glb"],
  usedFormat: "glb",
  scale: 1,
  rotationDegree: {
    x: 0,
    y: 0,
    z: 0,
  },
  name: {
    en: "Animated Cube",
    ja: "アニメーション付きの立方体",
  },
  description: {
    en: "",
    ja: "",
  },
  categoryTags: [],
  published: "2021-10-31",
  updated: "2021-10-31",
  isDownloadable: false,
  price: 0,
  creator: "",
  credit: "",
  license: "CC0",
};
