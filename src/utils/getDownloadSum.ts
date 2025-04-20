export const getDownloadSum = (downloadsData: any): number => {
  return downloadsData ? Object.keys(downloadsData).length : 0;
};
