import * as React from "react";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import {
  PaperCanvas,
  SteppedPixelTransition,
  HeroSection,
  GeometrySection,
  FilledLanguageSection,
  FamilySection,
  AnimationSection,
  DeveloperSection,
  RegistrySection,
  PlatformsSection,
  CatalogPreviewSection,
  SearchSection,
  QualitySection,
  FinalCta,
} from "@/components/landing";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Integrated Architectural Control Strip Header */}
      <Header />

      <main className="flex-1">
        {/* ================================================================= */}
        {/* CONTINUOUS TECHNICAL PAPER CANVAS 01: Systems & Geometry          */}
        {/* ================================================================= */}
        <PaperCanvas signals={true}>
          {/* Section 01: Hero Asymmetric Icon-Foundry Workstation */}
          <HeroSection />

          {/* Section 02: Precision Geometry Workbench */}
          <GeometrySection />

          {/* Section 03: Filled Silhouette Language */}
          <FilledLanguageSection />

          {/* Section 04: Semantic Icon Families */}
          <FamilySection />
        </PaperCanvas>

        {/* Stepped Pixel Boundary into Dark Technical Surface */}
        <SteppedPixelTransition direction="to-dark" />

        {/* ================================================================= */}
        {/* DARK TECHNICAL INTERRUPTION: Stepped Motion Engine & Developer API */}
        {/* ================================================================= */}
        <div className="relative bg-[#181715] text-[#faf9f5]">
          {/* Section 05: Dark Surface Stepped Motion Engine */}
          <AnimationSection />

          {/* Section 06: Dark Surface Developer API */}
          <DeveloperSection />
        </div>

        {/* Stepped Pixel Boundary Returning to Paper Canvas */}
        <SteppedPixelTransition direction="to-paper" />

        {/* ================================================================= */}
        {/* CONTINUOUS TECHNICAL PAPER CANVAS 02: Distribution & Verification  */}
        {/* ================================================================= */}
        <PaperCanvas signals={true}>
          {/* Section 07: shadcn Registry Workflow */}
          <RegistrySection />

          {/* Section 08: Multi-Platform Compiler Architecture */}
          <PlatformsSection />

          {/* Section 09: Curated Catalog Teaser */}
          <CatalogPreviewSection />

          {/* Section 10: Semantic Discovery & Search Metadata */}
          <SearchSection />

          {/* Section 11: Multi-Scale Quality QA Matrix */}
          <QualitySection />
        </PaperCanvas>

        {/* ================================================================= */}
        {/* DECISIVE CORAL CTA BAND                                           */}
        {/* ================================================================= */}
        <FinalCta />
      </main>

      {/* Surface Dark Footer */}
      <Footer />
    </div>
  );
}
