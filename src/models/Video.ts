import { category } from "./category";

export interface Video {
  _id?: string;
  title: string;
  description: string;
  poster: File | Blob | null | string;
  link: File | Blob | null | string;
  author?: string;
  isAvailable: boolean;
  category: string;
  creatdate_at?: Date;
  update_at?: Date;
}
