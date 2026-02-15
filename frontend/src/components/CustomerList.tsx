import { LayoutGrid, Search, ChevronRight } from "lucide-react";
import { type CustomerListProps } from "../interfaces/Customer";

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

export default CustomerList;
