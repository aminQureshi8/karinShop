import { Types } from "mongoose";
interface IFormInput {
  title: string;
  slug: string;
  category: string;
  subCategory?: string;
  brand: string;
  count?: number;
  price: string;
  colors: string[];
  images: File[];
  model?: string;
  storage?: string;
  ram?: string;
  screenSize?: string;
  refreshRate?: string;
  simCount?: string;
  battery?: number;
  camera?: string;
  os?: string;
  network?: string;
  subCategoryFeatures?: { name: string; value: string }[];
  description: string;
}

export interface Product {
  _id?: Types.ObjectId;
  title: string;
  slug: string;
  price: number;
  discount: number | null;
  category: Types.ObjectId;
  subCategory: Types.ObjectId;
  brand: Types.ObjectId;
  colors: string[];
  tags: string[];
  features: { name: string; value: string }[];
  imageUrls: string[];
  mainImage: string;
  description: string;
  count: number;
  inUserBasket: number;
  isStock: boolean;
  campaign: number;
  sale: number;
  off: number | null;
}

export default IFormInput;
