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
export const linkToBlob = (url: string): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        reject(`La requête a échoué avec le statut ${response.status}`);
      }

      // Récupérez le corps de la réponse en tant que tableau tampon (ArrayBuffer)
      const buffer = await response.arrayBuffer();

      // Créez un objet Blob à partir du tableau tampon
      const blob = new Blob([buffer]);

      resolve(blob);
    } catch (error) {
      reject("Erreur lors de la conversion du lien en Blob :" + error);
    }
  });
};


// =====================
export const convertBlobToUrl = (blob: Blob): string => {
  return URL.createObjectURL(blob);
};
