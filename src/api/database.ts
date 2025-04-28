import { EsperoDB } from "esperodb";
// import { category } from "../models/category";
const dataStructure: any = [
  {
    video: [
      {
        indexes: [{ category: { unique: false } }],
        primaryKey: "_id",
      },
    ],
  },
];
// Create an instance of the local database
export const db = new EsperoDB("wouitub", dataStructure, 1);
