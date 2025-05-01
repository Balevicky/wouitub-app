import { Video } from "../models/Video";
import { db } from "./database";

// =========== Ajout video
export const addVideo = async (video: Video) => {
  try {
    await db.addData("video", video);
    return {
      isSuccess: true,
      message: "video added successfuly!",
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: true,
      error,
    };
  }
};
// =========== mise à jour video
export const updateVideo = async (video: Video) => {
  try {
    await db.updateData("video", video);
    return {
      isSuccess: true,
      message: "video updated successfuly!",
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: true,
      error,
    };
  }
};
// =========== recupperer une  video
export const getVideo = async (_id: number) => {
  try {
    const video = await db.getData("video", _id);
    return {
      isSuccess: true,

      result: video,
      //   message: "video added successfuly!",
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: true,
      error,
    };
  }
};
// =========== recupperer toutes les  videos
export const getAllVideo = async () => {
  try {
    const videos = await db.getAllData("video");
    return {
      isSuccess: true,
      results: videos,
      //   message: "video gotten successfuly!",
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: true,
      error,
    };
  }
};
// =========== supprimer une video
export const deleteVideo = async (_id: number) => {
  try {
    const videos = await db.deleteData("video", _id);
    return {
      isSuccess: true,
      results: videos,
      message: "video deleted successfuly!",
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: true,
      error,
    };
  }
};
