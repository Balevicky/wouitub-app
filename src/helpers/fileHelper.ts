import { rejects } from "assert";
import { error } from "console";
import { promises } from "dns";
import { resolve } from "path";

export const convertFileToLink = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = (e) => {
      reject(new Error("Error redeading the file"));
    };
    reader.readAsDataURL(file);
  });
};
