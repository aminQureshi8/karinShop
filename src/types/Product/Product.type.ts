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
}

export default IFormInput;
