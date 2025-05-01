import { category } from "./category";

export interface Video {
  _id?: number;
  title: string;
  description: string;
  poster: File | Blob | null | string;
  link: File | Blob | null | string;
  author?: string;
  posterLink?: string;
  videolLink?: string;
  isAvailable: boolean;
  category: string;
  creatdate_at?: Date;
  update_at?: Date;
}
