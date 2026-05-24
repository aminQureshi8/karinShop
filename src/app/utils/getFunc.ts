import db from "@/config/db";
import blogModel from "@/models/blog";

async function getBlog(slug: string) {
  await db();

  return blogModel.findOne({ slug }).populate("category", "title").lean();
}

export default getBlog;

export function normalizeTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    if (
      tags.length === 1 &&
      typeof tags[0] === "string" &&
      tags[0].trim().startsWith("[")
    ) {
      try {
        const parsed = JSON.parse(tags[0]);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return tags as string[];
      }
    }
    return tags as string[];
  }

  if (typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags);
      return Array.isArray(parsed) ? parsed : [tags];
    } catch {
      return [tags];
    }
  }

  return [];
}
