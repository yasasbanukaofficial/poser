import { LayoutGrid, Search, ChevronRight } from "lucide-react";
import { type ItemListProps, type Item } from "../types/Item";

const ItemList = ({
  items,
  searchQuery,
  setSearchQuery,
  onSelectItem,
}: ItemListProps) => {
  const filtered = items.filter(
    (i: Item) =>
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (i.id || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="flex flex-col flex-1">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-zinc-800 pb-4 gap-4">
        <div className="flex items-center gap-2">
          <LayoutGrid size={16} className="text-[#d4ff00]" />
          <h3 className="text-xs font-black uppercase tracking-widest text-white">
            Registry Database
          </h3>
        </div>
        <div className="flex items-center gap-4 bg-zinc-900/50 px-4 py-2 border border-zinc-800 focus-within:border-[#d4ff00] transition-colors w-full md:w-auto">
          <Search size={14} className="text-zinc-600" />
          <input
            type="text"
            placeholder="SEARCH REGISTRY..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-[10px] font-mono text-white placeholder-zinc-700 focus:outline-none w-full md:w-48 uppercase tracking-widest"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px bg-zinc-900 border border-zinc-900 mb-20">
        {filtered.length > 0 ? (
          filtered.map((i: Item, index: number) => (
            <div
              key={index}
              onClick={() => onSelectItem && onSelectItem(i)}
              className="bg-[#0a0a0a] p-6 md:p-8 flex justify-between items-center group hover:bg-zinc-900/40 transition-all cursor-crosshair"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 w-full items-center gap-4">
                <div className="col-span-1 font-mono text-[#d4ff00] text-xs">
                  {i.id}
                </div>
                <div className="col-span-1 text-lg font-black text-white uppercase tracking-tight">
                  {i.name}
                </div>
                <div className="col-span-1 text-xs text-zinc-500 uppercase tracking-widest hidden md:block">
                  Stock: {i.stock}
                </div>
                <div className="col-span-1 text-xs text-zinc-500 uppercase tracking-widest hidden md:block">
                  Price: ${i.price}
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectItem && onSelectItem(i);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 border border-zinc-800 text-zinc-500 hover:text-[#d4ff00] hover:border-[#d4ff00]"
                  >
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

export default ItemList;
