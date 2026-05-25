import offModel from "@/models/off";
import productModel from "@/models/product";

export async function checkAndExpireOff() {
  const off = await offModel.findOne();

  if (!off) return;

  const now = Date.now();
  const end = new Date(off.dateTime).getTime();

  if (off.type === "all") {
    await productModel.updateMany({}, { $set: { campaion: 0 } });
  }

  if (off.type === "many") {
    const ids = off.products.map((p) => p.id);
    await productModel.updateMany(
      { _id: { $in: ids } },
      { $set: { campaion: 0 } },
    );
  }

  await offModel.deleteMany({});
}
