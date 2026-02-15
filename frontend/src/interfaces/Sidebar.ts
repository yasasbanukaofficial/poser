import { type LucideIcon } from "lucide-react";

export interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
