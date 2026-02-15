import { useState, type ReactNode } from "react";
import {
  User,
  Package,
  ShoppingCart,
  LayoutGrid,
  Plus,
  Search,
  ChevronRight,
  X,
  type LucideIcon,
} from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface HeaderProps {
  title: string;
  subtitle: string;
  onAddClick: () => void;
}

interface FormFieldProps {
  label: string;
  placeholder: string;
  type?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface Customer {
  id: string;
  name: string;
  address: string;
}

interface CustomerListProps {
  customers: Customer[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

interface StatCardProps {
  label: string;
  value: string;
}

// --- Sub-Components ---

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

const Header = ({ title, subtitle, onAddClick }: HeaderProps) => (
  <header className="mb-12 flex justify-between items-end">
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#d4ff00] font-mono text-xs">[02]</span>
        <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em]">
          {subtitle}
        </span>
      </div>
      <h2 className="text-6xl font-black tracking-tighter text-white uppercase leading-none">
        {title}
      </h2>
    </div>
    <button
      onClick={onAddClick}
      className="bg-[#d4ff00] px-8 py-4 text-black text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3"
    >
      <Plus size={16} /> New Record
    </button>
  </header>
);

const FormField = ({ label, placeholder, type = "text" }: FormFieldProps) => (
  <div className="flex flex-col gap-2 mb-6">
    <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="bg-transparent border-b border-zinc-800 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-[#d4ff00] transition-colors"
    />
  </div>
);

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-[#0f0f0f] border border-zinc-800 p-10 shadow-2xl animate-in">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-500 hover:text-white"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

const CustomerList = ({
  customers,
  searchQuery,
  setSearchQuery,
}: CustomerListProps) => {
  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="flex flex-col flex-1">
      <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <LayoutGrid size={16} className="text-[#d4ff00]" />
          <h3 className="text-xs font-black uppercase tracking-widest text-white">
            Registry Database
          </h3>
        </div>
        <div className="flex items-center gap-4 bg-zinc-900/50 px-4 py-2 border border-zinc-800 focus-within:border-[#d4ff00] transition-colors">
          <Search size={14} className="text-zinc-600" />
          <input
            type="text"
            placeholder="SEARCH REGISTRY..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-[10px] font-mono text-white placeholder-zinc-700 focus:outline-none w-48 uppercase tracking-widest"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px bg-zinc-900 border border-zinc-900 mb-20">
        {filtered.length > 0 ? (
          filtered.map((c, i) => (
            <div
              key={i}
              className="bg-[#0a0a0a] p-8 flex justify-between items-center group hover:bg-zinc-900/40 transition-all cursor-crosshair"
            >
              <div className="grid grid-cols-4 w-full items-center">
                <div className="col-span-1 font-mono text-[#d4ff00] text-xs">
                  {c.id}
                </div>
                <div className="col-span-1 text-lg font-black text-white uppercase tracking-tight">
                  {c.name}
                </div>
                <div className="col-span-1 text-xs text-zinc-500 uppercase tracking-widest">
                  {c.address}
                </div>
                <div className="col-span-1 flex justify-end">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 border border-zinc-800 text-zinc-500 hover:text-[#d4ff00] hover:border-[#d4ff00]">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#0a0a0a] p-20 text-center">
            <p className="text-zinc-600 font-mono text-xs uppercase tracking-[0.3em]">
              No records matching query
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="border-l border-zinc-800 pl-6 py-2">
    <h4 className="text-[10px] font-mono uppercase text-zinc-500 tracking-[0.2em] mb-1">
      {label}
    </h4>
    <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
  </div>
);

// --- Main Page Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("customer");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const mockCustomers: Customer[] = [
    { id: "001-ALPHA", name: "Aura Systems", address: "San Francisco, CA" },
    { id: "002-NEXUS", name: "Nexus Core", address: "Berlin, DE" },
    { id: "003-VORTX", name: "Vortex Dynamics", address: "Tokyo, JP" },
    { id: "004-QUANT", name: "Quantum Labs", address: "London, UK" },
    { id: "005-OMEGA", name: "Omega Robotics", address: "Seoul, KR" },
    { id: "006-PHASE", name: "Phase Shift Inc", address: "Austin, TX" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 antialiased flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 ml-64 p-12 md:p-20 flex flex-col relative min-h-screen">
        {/* Top Meta Info */}
        <div className="flex justify-between items-center mb-24 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
          <div>
            POSER /{" "}
            <span className="text-white">{activeTab.toUpperCase()}</span> /
            DIRECTORY
          </div>
          <div>
            SYST_STATUS: <span className="text-[#d4ff00]">ACTIVE</span>
          </div>
        </div>

        <Header
          title={
            activeTab === "customer"
              ? "Clients."
              : activeTab === "item"
                ? "Inventory."
                : "Orders."
          }
          subtitle="POSER Management Console"
          onAddClick={() => setIsModalOpen(true)}
        />

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <StatCard label="Live Nodes" value="50+" />
          <StatCard label="Automation" value="83%" />
          <StatCard label="Savings" value="$12.4M" />
          <StatCard label="Uptime" value="99.9%" />
        </div>

        {/* Database Section */}
        {activeTab === "customer" ? (
          <CustomerList
            customers={mockCustomers}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        ) : (
          <div className="flex-1 border border-dashed border-zinc-800 flex items-center justify-center mb-20">
            <p className="text-zinc-700 font-mono text-[10px] tracking-[0.5em] uppercase italic">
              Section_Loading...
            </p>
          </div>
        )}

        {/* Watermark */}
        <div className="fixed bottom-0 right-0 p-12 overflow-hidden pointer-events-none opacity-5">
          <h1 className="text-[25vw] font-black leading-none select-none italic">
            POSER
          </h1>
        </div>

        {/* Modal Popup */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#d4ff00] font-mono text-[10px]">
                [CREATE]
              </span>
              <h3 className="text-xs font-black uppercase tracking-widest text-white">
                Registry Entry
              </h3>
            </div>
            <p className="text-xs text-zinc-500">
              Enter secure data to populate the POSER global ledger.
            </p>
          </div>

          <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
            <FormField label="Identifier ID" placeholder="XXXX-0000" />
            <FormField label="Full Name" placeholder="Entity Name" />
            <FormField label="Postal Address" placeholder="Global Location" />

            <button className="mt-10 w-full bg-[#d4ff00] py-5 text-black text-xs font-black uppercase tracking-[0.3em] hover:brightness-110 transition-all flex items-center justify-center gap-2">
              Confirm Entry <ChevronRight size={14} />
            </button>
          </form>
        </Modal>
      </main>
    </div>
  );
}
