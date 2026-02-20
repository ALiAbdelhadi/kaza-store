import { BrandsSection } from "@/components/sections/brands";
import { CtaSection } from "@/components/sections/cta";
import { HeroSection } from "@/components/sections/hero";
import { MostPopularProducts } from "@/components/sections/most-popular-products";

export default function MainPage() {
    return (
        <>
            <HeroSection />
            <BrandsSection />
            <MostPopularProducts />
            <CtaSection />
        </>
    );
}