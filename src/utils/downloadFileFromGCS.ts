import JSZip from "jszip";

import { FileFormatType } from "@/src/types/fileFormats";
import { fileFormats } from "@/src/utils/fileFormats";

import { ModelDetailsType } from "@/src/types/models";

export const handleDownloadFileFromGCS = async (
  focusedModelsObj: ModelDetailsType,
  resolution: string,
  isZipped: boolean = true,
): Promise<void> => {
  const filesToDownload: FileFormatType[] = fileFormats.filter((format) =>
    focusedModelsObj.formats.includes(format.extension),
  );
  const downloadData: { blob: Blob; filename: string }[] =
    await downloadAllFiles(focusedModelsObj, resolution, filesToDownload);

  if (isZipped) {
    const zipBlob: Blob = await createZip(downloadData, focusedModelsObj.slug);
    triggerDownload(zipBlob, `${focusedModelsObj.slug}.zip`);
  } else {
    downloadData.forEach(
      ({ blob, filename }: { blob: Blob; filename: string }) => {
        triggerDownload(blob, filename);
      },
    );
  }
};

const downloadAllFiles = async (
  modelDetails: ModelDetailsType,
  resolution: string,
  formats: FileFormatType[],
): Promise<{ blob: Blob; filename: string }[]> => {
  return Promise.all(
    formats.map(async (format) => {
      const filename: string = `${modelDetails.slug}_${resolution}.${format.extension}`;
      let blob: Blob;

      if (
        process.env.NEXT_PUBLIC_ENV_STATUS === "development" &&
        process.env.NEXT_PUBLIC_USE_GCS_EMULATOR === "false"
      ) {
        blob = await fetchFileBlob(
          `/api/downloadModels/fromLocalFileSystem?focusedModelsSlug=${modelDetails.slug}&filename=${filename}&resolution=${resolution}`,
        );
      } else {
        blob = await fetchFileBlob(
          `/api/downloadModels/fromGCS?focusedModelsSlug=${modelDetails.slug}&filename=${filename}&resolution=${resolution}`,
        );
      }

      return { blob, filename };
    }),
  );
};

const fetchFileBlob = async (url: string): Promise<Blob> => {
  const response: Response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error downloading the file: ${response.statusText}`);
  }

  return response.blob();
};

const createZip = async (
  fileData: { blob: Blob; filename: string }[],
  zipName: string,
): Promise<Blob> => {
  const zip = new JSZip();
  // Try to create a folder with the provided name
  const folder = zip.folder(zipName);

  if (!folder) {
    throw new Error("Failed to create a folder in the zip file.");
  }

  // Add files to the created folder
  fileData.forEach(({ blob, filename }: { blob: Blob; filename: string }) => {
    folder.file(filename, blob, { compression: "DEFLATE" });
  });

  return zip.generateAsync({ type: "blob", compression: "DEFLATE" });
};

const triggerDownload = (blob: Blob, filename: string): void => {
  const url: string = window.URL.createObjectURL(blob);
  const link: HTMLAnchorElement = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
