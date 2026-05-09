import Hero from "../components/Hero";
import FeaturedSection from "../components/FeaturedSection";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedSection />
    </>
  );
}
