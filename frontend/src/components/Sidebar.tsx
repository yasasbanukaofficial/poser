import { Package, ShoppingCart, User } from "lucide-react";
import { type SidebarProps } from "../interfaces/Sidebar";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const tabs = [
    { id: "item", label: "Inventory", icon: Package },
    { id: "order", label: "Orders", icon: ShoppingCart },
    { id: "customer", label: "Customers", icon: User },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-zinc-800 flex flex-col pt-12 z-40">
      <div className="px-8 mb-16">
        <h1 className="text-2xl font-black tracking-tighter text-white italic">
          POSER<span className="text-[#d4ff00] not-italic">®</span>
        </h1>
      </div>
      <nav className="flex-1">
        {tabs.map((tab) => (
          <SidebarItem
            key={tab.id}
            icon={tab.icon}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
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
