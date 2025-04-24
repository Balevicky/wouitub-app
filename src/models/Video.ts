import { category } from "./category";

export interface Video {
  title: string;
  description: string;
  poster: File | null | string;
  link: File | null | string;
  author?: string;
  isAvailabble: boolean;
  category: string;
  creatdate_at?: Date;
  update_at?: Date;
}
