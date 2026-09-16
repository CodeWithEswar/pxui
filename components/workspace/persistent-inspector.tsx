"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { InspectorPanel } from "./inspector-panel";
import { InspectorTab } from "./hooks/use-icon-selection";

interface PersistentInspectorProps {
  icon: IconDefinition | null;
  onSelectIcon?: (icon: IconDefinition) => void;
  onClose?: () => void;
  activeTab?: InspectorTab;
  onTabChange?: (tab: InspectorTab) => void;
  isDrawer?: boolean;
  className?: string;
}

export function PersistentInspector({
  icon,
  onSelectIcon,
  onClose,
  activeTab: externalTab,
  onTabChange: externalOnTabChange,
  isDrawer,
  className,
}: PersistentInspectorProps) {
  const [internalTab, setInternalTab] = React.useState<InspectorTab>("specimen");

  const activeTab = externalTab || internalTab;
  const onTabChange = externalOnTabChange || setInternalTab;

  return (
    <InspectorPanel
      icon={icon}
      activeTab={activeTab}
      onTabChange={onTabChange}
      onSelectIcon={onSelectIcon}
      onClose={onClose}
      isDrawer={isDrawer}
      className={className}
    />
  );
}
