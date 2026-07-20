import { Hero } from "@/components/sections/Hero";
import { IndustriesStrip } from "@/components/sections/IndustriesStrip";
import { Services } from "@/components/sections/Services";
import { WhyTecDit } from "@/components/sections/WhyTecDit";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { BookACall } from "@/components/sections/BookACall";

export default function Home() {
  return (
    <>
      <Hero />
      <IndustriesStrip />
      <Services />
      <WhyTecDit />
      <HowItWorks />
      <FeaturedWork />
      <Pricing />
      <FAQ />
      <BookACall />
    </>
  );
}
