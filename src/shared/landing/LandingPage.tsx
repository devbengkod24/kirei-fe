"use client";

import { MotionConfig } from "framer-motion";
import { FacilitySection } from "./FacilitySection";
import { FaqSection } from "./FaqSection";
import { HeroSection } from "./HeroSection";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { RulesSection } from "./RulesSection";
import { TutorialSection } from "./TutorialSection";

function Divider({ strength }: { strength: string }) {
  return <div aria-hidden="true" className={`h-px bg-linear-to-r from-transparent to-transparent ${strength}`} />;
}

/* Layout follows the reservasi-fe landing page; copy and rules come from content.ts. */
export function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative overflow-x-hidden bg-surface">
        <LandingHeader />
        <main>
          <HeroSection />
          <Divider strength="via-primary/30" />
          <FacilitySection />
          <Divider strength="via-primary/40" />
          <RulesSection />
          <Divider strength="via-primary/50" />
          <TutorialSection />
          <Divider strength="via-primary/60" />
          <FaqSection />
        </main>
        <LandingFooter />
      </div>
    </MotionConfig>
  );
}
