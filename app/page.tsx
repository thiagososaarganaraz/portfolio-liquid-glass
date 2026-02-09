import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WorkSection } from "@/components/work-section"
import { ContactFooter } from "@/components/contact-footer"

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Fixed background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-liquid.jpg')" }}
        aria-hidden="true"
      >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </div>

      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
      </main>

      <ContactFooter />
    </div>
  )
}
