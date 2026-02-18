// frontend/src/features/orders/components/OrderList.tsx
import { LayoutGrid, Search, ChevronRight } from "lucide-react";
import { type Order } from "../types/Order";
import { type Item } from "../../items/types/Item"; // Import Item type

interface OrderListProps {
  orders: Order[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectOrder: (order: Order) => void;
  items: Item[]; // Add items prop
}

const OrderList = ({
  orders,
  searchQuery,
  setSearchQuery,
  onSelectOrder,
  items, // Destructure items prop
}: OrderListProps) => {
  const filtered = orders.filter((o: Order) => {
    const id = (o.id?.toString() || "").toLowerCase();
    const customerName = (o.customerName || "").toLowerCase();
    const orderDate = o.orderDate.toLowerCase(); 
    const itemNames = o.orderDetails.map(detail => {
      const item = items.find(i => i.id === detail.itemId);
      return (item?.name || "").toLowerCase();
    }).join(" ");

    const query = searchQuery.toLowerCase();
    return id.includes(query) || customerName.includes(query) || orderDate.includes(query) || itemNames.includes(query);
  });

  return (
    <section className="flex flex-col flex-1">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-zinc-800 pb-4 gap-4">
        <div className="flex items-center gap-2">
          <LayoutGrid size={16} className="text-[#d4ff00]" />
          <h3 className="text-xs font-black uppercase tracking-widest text-white">
            Order Records
          </h3>
        </div>
        <div className="flex items-center gap-4 bg-zinc-900/50 px-4 py-2 border border-zinc-800 focus-within:border-[#d4ff00] transition-colors w-full md:w-auto">
          <Search size={14} className="text-zinc-600" />
          <input
            type="text"
            placeholder="SEARCH ORDERS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-[10px] font-mono text-white placeholder-zinc-700 focus:outline-none w-full md:w-48 uppercase tracking-widest"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px bg-zinc-900 border border-zinc-900 mb-20">
        {filtered.length > 0 ? (
          filtered.map((o: Order, i: number) => {
            const totalAmount = o.orderDetails.reduce((sum, detail) => sum + (detail.qty * detail.price), 0);
            return (
              <div
                key={o.id || i} 
                onClick={() => onSelectOrder && onSelectOrder(o)}
                className="bg-[#0a0a0a] p-6 md:p-8 flex flex-col justify-between group hover:bg-zinc-900/40 transition-all cursor-crosshair relative" 
              >
                <div className="grid grid-cols-1 md:grid-cols-4 w-full items-center gap-4">
                  <div className="col-span-1 font-mono text-[#d4ff00] text-xs">
                    Order ID: {o.id}
                  </div>
                  <div className="col-span-1 text-lg font-black text-white uppercase tracking-tight">
                    Customer: {o.customerName}
                  </div>
                  <div className="col-span-1 text-xs text-zinc-500 uppercase tracking-widest hidden md:block">
                    Total: ${totalAmount.toFixed(2)}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectOrder && onSelectOrder(o);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 border border-zinc-800 text-zinc-500 hover:text-[#d4ff00] hover:border-[#d4ff00]"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
                {/* Order Date and Details */}
                <div className="mt-4 text-zinc-600 text-[10px] font-mono uppercase">
                  <div>Date: {new Date(o.orderDate).toLocaleDateString()}</div>
                  <div className="mt-2 flex flex-wrap gap-x-4">
                    {o.orderDetails.map((detail, detailIdx) => {
                      const item = items.find(item => item.id === detail.itemId);
                      return (
                        <span key={detailIdx} className="mb-1">
                          {item?.name || "Unknown Item"} (x{detail.qty}) @ ${detail.price.toFixed(2)}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
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

export default OrderList;
