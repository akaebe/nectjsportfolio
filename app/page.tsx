import { HeroSection } from '@/components/sections/hero-section';
import { WorkSection } from '@/components/sections/work-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Navigation } from '@/components/navigation';
import { ImmersiveBackground } from '@/components/immersive-background';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* <ImmersiveBackground /> */}
      <Navigation />
      <HeroSection />
      <WorkSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}