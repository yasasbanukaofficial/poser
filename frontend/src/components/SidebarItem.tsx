import { type SidebarItemProps } from "../interfaces/Sidebar";

const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 group
      ${isActive ? "bg-[#d4ff00] text-black" : "text-zinc-500 hover:text-white"}`}
  >
    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
    <span className="text-xs font-black uppercase tracking-widest">
      {label}
    </span>
  </button>
);

export default SidebarItem;
