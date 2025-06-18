import Slider from "@/components/common/ui/gallery/Slider";
import SectionPage from "@/components/layout/SectionPage";
import { products } from "@/data/products";

export default function Home() {
  return (
    <SectionPage>
      <Slider products={products} />
    </SectionPage>
  );
}
