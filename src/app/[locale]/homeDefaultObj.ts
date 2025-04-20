import { ModelDetailsType } from "@/src/types/models";

const homeDefaultObj: ModelDetailsType = {
  resolutions: ["1k"],
  slug: "fox_01",
  formats: ["glb"],
  usedFormat: "glb",
  scale: 1,
  rotationDegree: {
    x: 0,
    y: 0,
    z: 0,
  },
  name: {
    en: "Fox",
    ja: "キツネ",
  },
  description: {
    en: "",
    ja: "",
  },
  creator: "Quaternius",
  published: "2021-10-31",
  updated: "2021-10-31",
  categoryTags: ["nature", "animal", "lowPoly"],
  price: 0,
  license: "CC0",
  credit: "https://quaternius.com/packs/ultimateanimatedanimals.html",
  actions: [
    "Walk",
    "Jump_ToIdle",
    "Idle_HitReact2",
    "Idle_HitReact1",
    "Idle_2_HeadLow",
    "Idle_2",
    "Idle",
    "Gallop",
    "Eating",
    "Death",
    "Attack",
    "Gallop_Jump",
  ],
  isDownloadable: true,
};

export default homeDefaultObj;
