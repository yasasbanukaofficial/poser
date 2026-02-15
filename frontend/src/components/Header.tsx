import { Menu, Plus } from "lucide-react";
import { type HeaderProps } from "../interfaces/Header";

const Header = ({
  title,
  subtitle,
  onAddClick,
  setIsSidebarOpen,
  isSidebarOpen,
}: HeaderProps) => (
  <header className="mb-12 flex justify-between items-end">
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#d4ff00] font-mono text-xs">[02]</span>
        <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em]">
          {subtitle}
        </span>
      </div>
      <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">
        {title}
      </h2>
    </div>

    <div className="flex items-center gap-4">
      {/* Mobile Add Button */}
      <button
        onClick={onAddClick}
        className={`md:hidden p-2 text-[#d4ff00] ${
          isSidebarOpen ? "hidden" : ""
        }`}
      >
        <Plus size={24} />
      </button>

      {/* Desktop Add Button */}
      <button
        onClick={onAddClick}
        className="bg-[#d4ff00] px-8 py-4 text-black text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform hidden md:flex items-center gap-3"
      >
        <Plus size={16} /> New Record
      </button>
      <button
        className={`md:hidden p-2 ${isSidebarOpen ? "hidden" : ""}`}
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>
    </div>
  </header>
);

export default Header;

