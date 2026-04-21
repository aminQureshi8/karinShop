import offModel from "@/models/off";
import productModel from "@/models/product";

export async function checkAndExpireOff() {
  const off = await offModel.findOne();

  if (!off) return; // تخفیفی فعال نیست

  const now = Date.now();
  const end = new Date(off.dateTime).getTime();

  if (end > now) return; // هنوز وقتش نرسیده

  // 1. اگر all بود
  if (off.type === "all") {
    await productModel.updateMany({}, { $set: { campaion: 0 } });
  }

  // 2. اگر many بود
  if (off.type === "many") {
    const ids = off.products.map((p) => p.id);
    await productModel.updateMany(
      { _id: { $in: ids } },
      { $set: { campaion: 0 } },
    );
  }

  // 3. حذف off بعد از انقضا
  await offModel.deleteMany({});
}
