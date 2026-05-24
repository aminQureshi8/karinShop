const FEATURES = {
  "6a08c176cb34d5b275335acc": {
    رم: "ramLap",
    حافظه: "storageLap",
    "اندازه صفحه نمایش": "screenSize",
    پردازنده: "cpu",
    گرافیک: "gpu",
    وزن: "weight",
  },

  "693929d9ce7a3b533d3f7f18": {
    "نوع آنتن": "kindAnten",
    "تعداد پورت RJ45": "rj45",
    "نوع شبکه": "networkType",
    فرکانس: "ferquency",
    کلیدها: "keys",
    وزن: "weight",
  },

  "6a08c059cb34d5b275335a40": {
    برند: "brand",
    مدل: "model",
    "حافظه داخلی": "storage",
    رم: "ram",
    "سایز صفحه نمایش": "screenSize",
    "نرخ بروزرسانی": "refreshRate",
    "تعداد سیم‌کارت": "simCount",
    "ظرفیت باتری": "battery",
    "دوربین اصلی": "camera",
    سیستم‌عامل: "os",
    "نوع شبکه": "network",
  },

  "6a133ea6f9d10c0d8ea947f5": {
    برند: "brand",
    مدل: "model",
    "حافظه داخلی": "storage",
    پردازنده: "cpu",
    گرافیک: "gpu",
    رزولوشن: "resolution",
    "حداکثر فریم‌ریت": "fps",
    "نوع دیسک": "discType",
    "اقلام داخل جعبه": "inBox",
  },
};

export const getFeatures = (data: any, category: string) => {
  if (!(category in FEATURES)) return [];

  const map = FEATURES[category as keyof typeof FEATURES];

  const result: { name: string; value: string }[] = [];

  for (const [name, key] of Object.entries(map)) {
    const value = data[key];
    if (value != null && value !== "") {
      result.push({ name, value: String(value) });
    }
  }

  return result;
};
