import Navbar from "@/components/main/navbar/Navbar";
import AetherHero from "@/components/main/hero/AetherHero";

export default function Home() {
  return (
    <main>
      <Navbar />
      <AetherHero
        title="YouTube Thumbnails, Crafted by AI."
        subtitle="Nailart AI generates scroll-stopping thumbnails in seconds. Describe your video — we handle the design."
        ctaLabel="Generate Thumbnail"
        ctaHref="#generate"
        secondaryCtaLabel="See Examples"
        secondaryCtaHref="#examples"
      />
    </main>
  );
}
