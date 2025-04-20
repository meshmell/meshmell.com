export const Resolution = {
  oneK: "1k",
} as const;

export type ResolutionKeyType = keyof typeof Resolution;

export const resolutionArray: ResolutionKeyType[] = Object.keys(
  Resolution,
) as ResolutionKeyType[];
