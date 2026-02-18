import { useActionState, useEffect, useState } from "react";
import { ChevronRight, Plus, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import Header from "../components/layout/Header";
import StatCard from "../components/ui/StatCard";
import Modal from "../components/ui/Modal";
import FormField from "../components/ui/FormField";
import SelectField from "../components/ui/SelectField";
import { useOrders } from "../features/orders/hooks/useOrders";
import { orderAPI } from "../features/orders/api/api";
import type { Order, OrderItem } from "../features/orders/types/Order";
import OrderList from "../features/orders/components/OrderList";
import { useCustomers } from "../features/customers/hooks/useUser";
import { useItems } from "../features/items/hooks/useItems";

interface OrderPageProps {
  activeTab: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const OrderPage = ({
  activeTab,
  isSidebarOpen,
  setIsSidebarOpen,
}: OrderPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: orders, isLoading, error } = useOrders();
  const { data: customers } = useCustomers();
  const { data: items } = useItems();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const queryClient = useQueryClient();

  // Form state
  const [orderId, setOrderId] = useState<string>("");
  const [customerId, setCustomerId] = useState<string>("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  // Temp state for adding new items to order
  const [currentItemId, setCurrentItemId] = useState<string>("");
  const [currentItemQty, setCurrentItemQty] = useState<number>(1);

  const [, formAction, isPending] = useActionState(handleSubmit, null);

  useEffect(() => {
    if (selectedOrder) {
      setOrderId(selectedOrder.id || "");
      setCustomerId(String(selectedOrder.customerId));
      setOrderItems(selectedOrder.orderDetails || []);
    } else {
      setOrderId("");
      setCustomerId("");
      setOrderItems([]);
    }
  }, [selectedOrder]);

  if (isLoading) {
    return <div>Loading orders...</div>;
  }
  if (error) {
    return <div>Error loading orders</div>;
  }

  async function handleSubmit() {
    try {
      if (!customerId || orderItems.length === 0) {
        alert("Please select a customer and add at least one item.");
        return;
      }

      const customerIdNum = Number(customerId);
      if (Number.isNaN(customerIdNum)) {
        alert("Invalid customer selected");
        return;
      }

      const orderDetails = orderItems.map((oi) => ({
        itemId: Number(oi.itemId),
        qty: oi.qty,
        price: oi.price,
      }));

      const orderData = {
        customerId: customerIdNum,
        orderDate: new Date().toISOString(),
        orderDetails,
      };

      if (selectedOrder) {
        await orderAPI.update({
          ...orderData,
          id: orderId,
        });
      } else {
        await orderAPI.create(orderData);
      }

      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["items"] }); // Invalidate items for stock changes
      return true;
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to save order. Please check the console.");
    }
  }

  function handleOpenCreate() {
    setSelectedOrder(null);
    setIsModalOpen(true);
  }

  function handleSelectOrder(order: Order) {
    setSelectedOrder(order);
    setIsModalOpen(true);
  }

  async function handleDelete() {
    try {
      if (selectedOrder) {
        await orderAPI.delete(orderId);
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        setIsModalOpen(false);
      } else {
        throw new Error("deleting order failed, select an order!");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to delete order. Please check the console.");
    }
  }

  function handleAddItemToOrder() {
    if (!currentItemId || currentItemQty <= 0) return;
    const item = items?.find(
      (i: any) => String(i.id) === String(currentItemId),
    );
    if (!item) return;

    const currentItemIdNum = Number(currentItemId);
    if (Number.isNaN(currentItemIdNum)) return;

    const existingItem = orderItems.find(
      (oi) => oi.itemId === currentItemIdNum,
    );

    if (existingItem) {
      setOrderItems(
        orderItems.map((oi) =>
          oi.itemId === currentItemIdNum
            ? { ...oi, qty: oi.qty + currentItemQty }
            : oi,
        ),
      );
    } else {
      setOrderItems([
        ...orderItems,
        {
          itemId: currentItemIdNum,
          qty: currentItemQty,
          price: item.price || 0,
        },
      ]);
    }
    setCurrentItemId("");
    setCurrentItemQty(1);
  }

  function handleRemoveItemFromOrder(itemId: number) {
    setOrderItems(orderItems.filter((oi) => oi.itemId !== itemId));
  }

  const total = orderItems
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <main className="flex-1 md:ml-48 lg:ml-64 p-4 sm:p-6 md:p-12 lg:p-20 flex flex-col relative min-h-screen">
      <div className="flex justify-between items-center mb-24 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
        <div>
          POSER / <span className="text-white">{activeTab.toUpperCase()}</span>{" "}
          / DIRECTORY
        </div>
        <div>
          SYST_STATUS: <span className="text-[#d4ff00]">ACTIVE</span>
        </div>
      </div>

      <Header
        title="Orders."
        subtitle="POSER Management Console"
        onAddClick={handleOpenCreate}
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
        <StatCard label="Total Orders" value={orders.length} />
        <StatCard label="Automation" value="83%" />
        <StatCard label="Connectivity" value="100%" />
        <StatCard label="Uptime" value="99.9%" />
      </div>

      <OrderList
        orders={orders || []}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectOrder={handleSelectOrder}
      />

      <div className="fixed bottom-0 right-0 p-12 overflow-hidden pointer-events-none opacity-5">
        <h1 className="text-[25vw] font-black leading-none select-none italic">
          POSER
        </h1>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        footer={
          selectedOrder ? (
            <>
              <button
                form="order-form"
                disabled={isPending}
                className="px-6 py-3 bg-[#d4ff00] text-black text-xs font-black uppercase tracking-[0.3em] hover:brightness-110 transition-all"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-[#ff4d4f] text-white text-xs font-black uppercase tracking-[0.3em] hover:brightness-110 transition-all"
              >
                Delete
              </button>
            </>
          ) : undefined
        }
      >
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#d4ff00] font-mono text-[10px]">
              {selectedOrder ? "[EDIT]" : "[CREATE]"}
            </span>
            <h3 className="text-xs font-black uppercase tracking-widest text-white">
              Order Details
            </h3>
          </div>
          <p className="text-xs text-zinc-500">
            Enter secure data to populate the POSER global ledger.
          </p>
        </div>
        <form id="order-form" className="space-y-4" action={formAction}>
          <SelectField
            label="Customer"
            name="customer"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            disabled={!!selectedOrder}
          >
            <option value="">Select a Customer</option>
            {customers?.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </SelectField>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
              Add Item
            </label>
            <div className="flex items-end gap-2 mt-2">
              <div className="flex-1">
                <SelectField
                  label=""
                  name="item"
                  value={currentItemId}
                  onChange={(e) => setCurrentItemId(e.target.value)}
                >
                  <option value="">Select an Item</option>
                  {items?.map((i: any) => (
                    <option key={i.id} value={i.id} disabled={i.qty === 0}>
                      {i.name} ({i.qty} in stock)
                    </option>
                  ))}
                </SelectField>
              </div>
              <div className="w-24">
                <FormField
                  label=""
                  name="quantity"
                  type="number"
                  placeholder="Qty"
                  defaultValue={currentItemQty}
                  onChange={(e) =>
                    setCurrentItemQty(parseInt(e.target.value, 10))
                  }
                />
              </div>
              <button
                type="button"
                onClick={handleAddItemToOrder}
                className="p-3 bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                <Plus size={18} className="text-white" />
              </button>
            </div>
          </div>

          {orderItems.length > 0 && (
            <div className="border border-dashed border-zinc-800">
              <table className="w-full text-left">
                <thead>
                  <tr className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                    <th className="p-2">Item</th>
                    <th className="p-2 text-center">Qty</th>
                    <th className="p-2 text-right">Price</th>
                    <th className="p-2 text-right">Subtotal</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((oi) => {
                    const item = items?.find(
                      (i: any) => String(i.id) === String(oi.itemId),
                    );
                    return (
                      <tr
                        key={oi.itemId}
                        className="text-xs border-t border-dashed border-zinc-800"
                      >
                        <td className="p-2">{item?.name || "Unknown Item"}</td>
                        <td className="p-2 text-center">{oi.qty}</td>
                        <td className="p-2 text-right">
                          ${oi.price.toFixed(2)}
                        </td>
                        <td className="p-2 text-right font-mono">
                          ${(oi.qty * oi.price).toFixed(2)}
                        </td>
                        <td className="p-2 text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveItemFromOrder(oi.itemId)}
                          >
                            <Trash2 size={14} className="text-red-500" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="p-2 text-right font-bold text-sm border-t border-dashed border-zinc-800">
                Total: <span className="font-mono">${total}</span>
              </div>
            </div>
          )}

          {!selectedOrder && (
            <button
              disabled={isPending}
              className="mt-10 w-full bg-[#d4ff00] py-5 text-black text-xs font-black uppercase tracking-[0.3em] hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              Confirm Entry <ChevronRight size={14} />
            </button>
          )}
        </form>
      </Modal>
    </main>
  );
};

export default OrderPage;
