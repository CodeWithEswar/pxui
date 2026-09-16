"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { IconDefinition } from "@/lib/icons/schema";
import { toPXComponentName } from "@/lib/compiler";
import { analyzeGeometry } from "@/lib/geometry/path-analysis";
import { SpecHeader } from "./spec-header";
import { SpecIndexRail, SpecSectionItem } from "./spec-index-rail";
import { SpecMobileNav } from "./spec-mobile-nav";
import { SpecHeroSpecimen } from "./spec-hero-specimen";
import { SpecGeometryLab } from "./spec-geometry-lab";
import { SpecOpticalSizes } from "./spec-optical-sizes";
import { SpecVariants } from "./spec-variants";
import { SpecMotionWorkbench } from "./spec-motion-workbench";
import { SpecCodeSurface } from "./spec-code-surface";
import { SpecRegistryDetails } from "./spec-registry-details";
import { SpecMetadataTaxonomy } from "./spec-metadata-taxonomy";
import { SpecAccessibilityGuide } from "./spec-accessibility-guide";
import { SpecQualityGate } from "./spec-quality-gate";
import { SpecFamilyStrip } from "./spec-family-strip";
import { SpecFullscreenModal } from "./spec-fullscreen-modal";
import { SpecCompareModal } from "./spec-compare-modal";
import { SpecFamilyProofModal } from "./spec-family-proof-modal";
import { IconCopyDialog, type CopyDialogTab } from "@/components/icons";
import { copyToClipboard } from "@/lib/clipboard";

interface SpecWorkspaceProps {
  icon: IconDefinition;
  allIcons: IconDefinition[];
}

export function SpecWorkspace({ icon, allIcons }: SpecWorkspaceProps) {
  const router = useRouter();

  // Modal states
  const [isFullscreenOpen, setIsFullscreenOpen] = React.useState(false);
  const [isCompareOpen, setIsCompareOpen] = React.useState(false);
  const [isFamilyProofOpen, setIsFamilyProofOpen] = React.useState(false);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = React.useState(false);
  const [copyDialogTab, setCopyDialogTab] = React.useState<CopyDialogTab>("react");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const toastTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const showToast = React.useCallback((message: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 2500);
  }, []);

  const handleOpenCopyDialog = React.useCallback(
    async (tab: CopyDialogTab = "react") => {
      setCopyDialogTab(tab);
      setIsCopyDialogOpen(true);
      const snippet = `<${toPXComponentName(icon.name)} size={24} />`;
      await copyToClipboard(snippet);
      showToast(`Copied <${toPXComponentName(icon.name)} /> · Opening Export Dialog`);
    },
    [icon.name, showToast]
  );

  const handleCloseAllModals = React.useCallback(() => {
    setIsFullscreenOpen(false);
    setIsCompareOpen(false);
    setIsFamilyProofOpen(false);
    setIsCopyDialogOpen(false);
  }, []);

  // Geometry analysis
  const analysis = React.useMemo(() => {
    return analyzeGeometry(icon.paths, icon.grid || 24);
  }, [icon]);

  // Family and candidate calculation
  const familyName = icon.family || icon.name.split("-")[0];
  const familyIcons = React.useMemo(() => {
    return allIcons.filter(
      (i) => (i.family || i.name.split("-")[0]) === familyName
    );
  }, [allIcons, familyName]);

  const candidateIcons = React.useMemo(() => {
    return allIcons.filter((i) => i.name !== icon.name);
  }, [allIcons, icon.name]);

  // Sequential previous and next icons in catalog
  const currentIndex = allIcons.findIndex((i) => i.name === icon.name);
  const prevIcon = currentIndex > 0 ? allIcons[currentIndex - 1] : null;
  const nextIcon = currentIndex < allIcons.length - 1 ? allIcons[currentIndex + 1] : null;

  // Active section for scroll-spy
  const [activeSection, setActiveSection] = React.useState("overview");

  // Dynamic sections based on capabilities
  const sections: SpecSectionItem[] = React.useMemo(() => {
    const list: SpecSectionItem[] = [
      { id: "overview", label: "Overview" },
      { id: "geometry", label: "Geometry" },
      { id: "sizes", label: "Optical Sizes" },
      { id: "variants", label: "Variants" },
    ];

    if (icon.animation) {
      list.push({ id: "motion", label: "Motion", badge: "Live" });
    }

    list.push(
      { id: "code", label: "Code" },
      { id: "registry", label: "Registry" },
      { id: "metadata", label: "Metadata" },
      { id: "accessibility", label: "Accessibility" },
      { id: "quality", label: "Quality Gates" },
      { id: "family", label: "Family Specimens" }
    );

    return list;
  }, [icon.animation]);

  // Scroll-spy observer
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  // Global keyboard shortcuts: ArrowLeft, ArrowRight, C, Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      const isInput =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.isContentEditable);
      if (isInput) return;

      const isAnyModalOpen =
        isFullscreenOpen || isCompareOpen || isFamilyProofOpen || isCopyDialogOpen;

      // Escape closes any open modal
      if (e.key === "Escape") {
        if (isAnyModalOpen) {
          e.preventDefault();
          handleCloseAllModals();
          showToast("Closed modal");
        }
        return;
      }

      // Block navigation and shortcuts if any modal is currently active
      if (isAnyModalOpen) return;

      if (e.key === "ArrowLeft" && prevIcon) {
        e.preventDefault();
        showToast(`← Navigating to ${toPXComponentName(prevIcon.name)}`);
        router.push(`/icons/px-${prevIcon.name}`);
      } else if (e.key === "ArrowRight" && nextIcon) {
        e.preventDefault();
        showToast(`→ Navigating to ${toPXComponentName(nextIcon.name)}`);
        router.push(`/icons/px-${nextIcon.name}`);
      } else if (
        e.key.toLowerCase() === "c" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        e.preventDefault();
        handleOpenCopyDialog("react");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    prevIcon,
    nextIcon,
    router,
    isFullscreenOpen,
    isCompareOpen,
    isFamilyProofOpen,
    isCopyDialogOpen,
    handleCloseAllModals,
    handleOpenCopyDialog,
    showToast,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5] dark:bg-[#181715] text-[#141413] dark:text-[#faf9f5] selection:bg-[#cc785c] selection:text-white transition-colors relative">
      {/* 1. Dedicated Specification Tool Header */}
      <SpecHeader
        icon={icon}
        onOpenFullscreen={() => setIsFullscreenOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenFamilyProof={() => setIsFamilyProofOpen(true)}
        onOpenCopyDialog={handleOpenCopyDialog}
      />

      {/* 2. Mobile/Tablet Sticky Section Navigation */}
      <SpecMobileNav
        sections={sections}
        activeSection={activeSection}
        onSelectSection={scrollToSection}
      />

      {/* 3. Full-Window Body: Sticky Left Rail + Main Document Canvas */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto flex items-start">
        {/* Sticky Left Navigation Rail (Desktop) */}
        <SpecIndexRail
          sections={sections}
          activeSection={activeSection}
          onSelectSection={scrollToSection}
        />

        {/* Main Specification Canvas */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 py-8 lg:py-10 space-y-16 max-w-[1280px]">
          {/* Section: Overview & Specimen Hero */}
          <SpecHeroSpecimen
            icon={icon}
            analysis={analysis}
            onOpenFullscreen={() => setIsFullscreenOpen(true)}
          />

          {/* Section: Geometry Lab */}
          <SpecGeometryLab icon={icon} analysis={analysis} />

          {/* Section: Optical Sizes Proof */}
          <SpecOpticalSizes icon={icon} />

          {/* Section: Variants */}
          <SpecVariants icon={icon} />

          {/* Section: Motion Workbench (Capability-driven) */}
          {icon.animation && <SpecMotionWorkbench icon={icon} />}

          {/* Section: Code Surface */}
          <SpecCodeSurface icon={icon} />

          {/* Section: Registry Details */}
          <SpecRegistryDetails icon={icon} />

          {/* Section: Metadata Taxonomy */}
          <SpecMetadataTaxonomy icon={icon} />

          {/* Section: Accessibility Contract */}
          <SpecAccessibilityGuide icon={icon} />

          {/* Section: Quality Gates */}
          <SpecQualityGate icon={icon} analysis={analysis} />

          {/* Section: Family Specimens & Sequential Navigation */}
          <SpecFamilyStrip
            icon={icon}
            familyIcons={familyIcons}
            prevIcon={prevIcon}
            nextIcon={nextIcon}
            onOpenCopyDialog={handleOpenCopyDialog}
            onCloseModal={handleCloseAllModals}
            isAnyModalOpen={
              isFullscreenOpen || isCompareOpen || isFamilyProofOpen || isCopyDialogOpen
            }
          />
        </main>
      </div>

      {/* Signature Fullscreen Specimen Modal */}
      <SpecFullscreenModal
        icon={icon}
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
      />

      {/* Signature Compare Modal */}
      <SpecCompareModal
        primaryIcon={icon}
        candidateIcons={candidateIcons}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />

      {/* Signature Family Proof Modal */}
      <SpecFamilyProofModal
        familyName={familyName}
        familyIcons={familyIcons}
        isOpen={isFamilyProofOpen}
        onClose={() => setIsFamilyProofOpen(false)}
      />

      {/* Developer Export & Copy Dialog */}
      <IconCopyDialog
        icon={icon}
        isOpen={isCopyDialogOpen}
        onClose={() => setIsCopyDialogOpen(false)}
        initialTab={copyDialogTab}
      />

      {/* Tactile Keyboard & Copy Action Feedback Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#141413] dark:bg-[#faf9f5] text-[#faf9f5] dark:text-[#141413] shadow-2xl border border-[#cc785c]/30 font-mono text-xs transition-all animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <span className="w-2 h-2 rounded-full bg-[#cc785c] animate-pulse shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
