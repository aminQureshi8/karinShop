import SwiperProductContainer from "@/components/template/Home/SwiperProduct/SwiperProductContainer";

export default function SwiperRe({ products }: any) {
  return (
    <div>
      <SwiperProductContainer products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}
