"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { InspectorIdentity } from "./inspector-identity";
import { InspectorTabs } from "./inspector-tabs";
import { InspectorContent } from "./inspector-content";
import { InspectorEmptyState } from "./inspector-empty-state";
import { InspectorTab } from "./hooks/use-icon-selection";
import { cn } from "@/lib/utils";

interface InspectorPanelProps {
  icon: IconDefinition | null;
  activeTab: InspectorTab;
  onTabChange: (tab: InspectorTab) => void;
  onSelectIcon?: (icon: IconDefinition) => void;
  onClose?: () => void;
  className?: string;
  isDrawer?: boolean;
}

export function InspectorPanel({
  icon,
  activeTab,
  onTabChange,
  onSelectIcon,
  onClose,
  className,
  isDrawer = false,
}: InspectorPanelProps) {
  if (!icon) {
    return (
      <aside
        className={cn(
          "flex min-h-0 min-w-0 flex-col border-l border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#181715] text-[#141413] dark:text-[#faf9f5] shrink-0 select-none h-full overflow-hidden",
          isDrawer ? "w-full" : "w-[408px] xl:w-[424px] 2xl:w-[432px]",
          className
        )}
      >
        <InspectorEmptyState />
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "flex min-h-0 min-w-0 flex-col border-l border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#181715] shrink-0 select-none h-full overflow-hidden text-[#141413] dark:text-[#faf9f5]",
        isDrawer ? "w-full" : "w-[408px] xl:w-[424px] 2xl:w-[432px]",
        className
      )}
    >
      {/* 1. Fixed Identity Header */}
      <InspectorIdentity icon={icon} onClose={onClose} />

      {/* 2. Fixed Inspector Tabs */}
      <InspectorTabs activeTab={activeTab} onTabChange={onTabChange} />

      {/* 3. Independently Scrollable Tab Content */}
      <InspectorContent
        icon={icon}
        activeTab={activeTab}
        onSelectIcon={onSelectIcon}
      />
    </aside>
  );
}
