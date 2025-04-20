export type ModalOpenType = {
  language: boolean;
  terms: boolean;
  privacy: boolean;
  contact: boolean;
  about: boolean;
  who: boolean;
  forDevelopers: boolean;
  forSponsors: boolean;
  lightAndDarkTheme: boolean;
  sponsors: boolean;
  footer: boolean;
  shareThisPage: boolean;
  copyRight: boolean;
  actionsSwitch: boolean;
  creatorInfo: boolean;
  modelInfo: boolean;

  // for Distribute
  search?: boolean;
  categoryFilter?: boolean;
  download?: boolean;
  downloadCredit?: boolean;
  creatorFilter?: boolean;
  downloadError?: boolean;
  viewsSwitch?: boolean;
  creatorInfoInNotFocused?: boolean;
};

export type ModalName =
  | "footer"
  | "terms"
  | "privacy"
  | "contact"
  | "about"
  | "who"
  | "search"
  | "language"
  | "modelInfo"
  | "categoryFilter"
  | "download"
  | "creatorInfo"
  | "downloadCredit"
  | "creatorFilter"
  | "copyRight"
  | "actionsSwitch"
  | "downloadError"
  | "sponsors"
  | "viewsSwitch"
  | "creatorInfoInNotFocused"
  | "shareThisPage"
  | "forDevelopers"
  | "forSponsors"
  | "lightAndDarkTheme";

export type WindowModalType = {
  actionsSwitch: boolean;
};
