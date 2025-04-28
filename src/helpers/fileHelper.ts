// import { rejects } from "assert";
// import { Blob } from "buffer";
// import { error } from "console";
// import { promises } from "dns";
// import { resolve } from "path";

export const convertFileToLink = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = () => {
      reject(new Error("Error redeading the file"));
    };
    reader.readAsDataURL(file);
  });
};
// ==============
export const convertFileToBlob = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result instanceof ArrayBuffer) {
        const blob = new Blob([e.target.result], { type: file.type });
        resolve(blob);
      } else {
        reject(new Error("Error redeading the Blob"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Error redeading the file"));
    };
    reader.readAsArrayBuffer(file);
  });
};
// ==============
export const convertBlobToUrl = (blob: Blob): string => {
  return URL.createObjectURL(blob);
};
