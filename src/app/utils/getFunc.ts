import db from "@/config/db";
import blogModel from "@/models/blog";

async function getBlog(slug: string) {
  await db();

  return blogModel.findOne({ slug }).populate("category", "title").lean();
}

export default getBlog;
