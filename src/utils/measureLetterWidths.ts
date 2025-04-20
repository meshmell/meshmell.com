import { LocaleKeyType } from "../types/locale";

export const measureLetterWidths = (
  font: string,
  fontSizeForCalc: number,
  textObj: { en: string; ja: string },
  locale: LocaleKeyType,
): number => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Failed to get canvas context");
  }

  context.font = `${fontSizeForCalc}px '${font}'`;

  // const widths = new Map<string, number>();
  let totalWidth = 0;

  for (const letter of textObj[locale]) {
    const metrics = context.measureText(letter);
    totalWidth += metrics.width;
  }

  // console.log("widths", widths, totalWidth);

  return totalWidth;
};
