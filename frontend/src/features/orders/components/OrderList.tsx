import type { Order, OrderItem } from "../types/Order";
import { useCustomers } from "../../customers/hooks/useUser";

interface OrderListProps {
  orders: Order[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectOrder: (order: Order) => void;
}

const OrderList = ({
  orders,
  searchQuery,
  setSearchQuery,
  onSelectOrder,
}: OrderListProps) => {
  const { data: customers } = useCustomers();

  const getCustomerName = (customerId: number | string) => {
    return (
      customers?.find((c: any) => String(c.id) === String(customerId))?.name ||
      String(customerId)
    );
  };

  const filteredOrders = orders.filter((order) => {
    const q = searchQuery.toLowerCase();
    return (
      String(order.id ?? "")
        .toLowerCase()
        .includes(q) ||
      String(order.customerId ?? "")
        .toLowerCase()
        .includes(q) ||
      getCustomerName(order.customerId).toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 flex flex-col bg-[#0f0f0f] border border-dashed border-zinc-800">
      <div className="p-4 border-b border-dashed border-zinc-800">
        <input
          type="text"
          placeholder="Search orders by ID, customer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-white placeholder-zinc-600 focus:outline-none"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-[#0f0f0f]">
            <tr className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Order Date</th>
              <th className="p-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-dashed border-zinc-800 hover:bg-zinc-900 cursor-pointer"
                onClick={() => onSelectOrder(order)}
              >
                <td className="p-4 text-white font-mono text-xs">
                  {String(order.id ?? "").substring(0, 8)}...
                </td>
                <td className="p-4 text-white">
                  {getCustomerName(order.customerId)}
                </td>
                <td className="p-4 text-white">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="p-4 text-white font-mono text-xs">
                  $
                  {(order.orderDetails || ([] as OrderItem[]))
                    .reduce(
                      (acc: number, item: OrderItem) =>
                        acc + item.price * item.qty,
                      0,
                    )
                    .toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
