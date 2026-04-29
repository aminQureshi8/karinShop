import { unstable_cache } from "next/cache";
import brandModel from "@/models/brand";

export const getBrands = unstable_cache(
  async () => {
    return await brandModel.find({ imageUrl: { $ne: "" } }, "-__v").lean();
  },
  ["brands"],
  { revalidate: 120 },
);
  