import { Package, ShoppingCart, User, X } from "lucide-react";
import SidebarItem from "../ui/SidebarItem";
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
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar = ({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) => {
  const tabs = [
    { id: "item", label: "Inventory", icon: Package },
    { id: "order", label: "Orders", icon: ShoppingCart },
    { id: "customer", label: "Customers", icon: User },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen md:w-48 lg:w-64 bg-black border-r border-zinc-800 flex flex-col pt-12 z-40 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="px-8 mb-16 flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-tighter text-white italic">
          POSER<span className="text-[#d4ff00] not-italic">®</span>
        </h1>
        <button
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1">
        {tabs.map((tab) => (
          <SidebarItem
            key={tab.id}
            icon={tab.icon}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setIsSidebarOpen(false); // Close sidebar on tab change in mobile
            }}
          />
        ))}
      </nav>
      <div className="p-6 border-t border-zinc-900">
        <p className="text-[10px] text-zinc-600 font-mono uppercase">
          POSER OS / V1.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
