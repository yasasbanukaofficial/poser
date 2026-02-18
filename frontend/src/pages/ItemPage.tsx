import { useActionState, useState } from "react";
import { ChevronRight } from "lucide-react";
import Header from "../components/layout/Header";
import StatCard from "../components/ui/StatCard";
import Modal from "../components/ui/Modal";
import FormField from "../components/ui/FormField";
import { itemAPI } from "../features/items/api/api";
import type { Item } from "../features/items/types/Item";
import { useItems } from "../features/items/hooks/useItems";
import { useQueryClient } from "@tanstack/react-query";
import ItemList from "../features/items/components/ItemList";

interface ItemPageProps {
  activeTab: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const ItemPage = ({
  activeTab,
  isSidebarOpen,
  setIsSidebarOpen,
}: ItemPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: items, isLoading, error } = useItems();
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [qty, setQty] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const queryClient = useQueryClient();

  const [, formAction, isPending] = useActionState(handleUpdate, null);

  if (isLoading) {
    return <div>Loading items...</div>;
  }
  if (error) {
    return <div>Error loading items</div>;
  }

  async function handleUpdate(_: any, formData: FormData) {
    const name = formData.get("itemName") as string;
    const qty = parseFloat(formData.get("itemQty") as string);
    const price = parseFloat(formData.get("itemPrice") as string);

    try {
      if (!name || Number.isNaN(qty) || Number.isNaN(price)) {
        alert("Please fill in all fields.");
        return;
      }

      if (selectedItem) {
        await itemAPI.update({
          id,
          name,
          qty,
          price,
        } as Item);
      } else {
        await itemAPI.create({
          name,
          qty,
          price,
        } as Item);
      }

      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["items"] });
      return true;
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to save item. Please check the console.");
    }
  }

  function handleOpenCreate() {
    setSelectedItem(null);
    setName("");
    setQty(0);
    setPrice(0);
    setIsModalOpen(true);
  }

  function handleSelectItem(i: Item) {
    setSelectedItem(i);
    setId(i.id || "");
    setName(i.name);
    setQty(i.qty || 0);
    setPrice(i.price || 0);
    setIsModalOpen(true);
  }

  async function handleDelete() {
    try {
      if (selectedItem) {
        await itemAPI.delete(id);
        queryClient.invalidateQueries({ queryKey: ["items"] });
        setIsModalOpen(false);
      } else {
        throw new Error("deleting item failed, select an item!");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to save item. Please check the console.");
    }
  }

  return (
    <main className="flex-1 md:ml-48 lg:ml-64 p-4 sm:p-6 md:p-12 lg:p-20 flex flex-col relative min-h-screen">
      {/* Top Meta Info */}
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
        title={
          activeTab === "customer"
            ? "Clients."
            : activeTab === "item"
              ? "Inventory."
              : "Orders."
        }
        subtitle="POSER Management Console"
        onAddClick={() => handleOpenCreate()}
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
        <StatCard label="Items" value={items.length} />
        <StatCard label="Automation" value="83%" />
        <StatCard label="Item Details Validation" value="100%" />
        <StatCard label="Uptime" value="99.9%" />
      </div>

      {/* Database Section */}
      {activeTab === "item" ? (
        <ItemList
          items={items || []}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectItem={handleSelectItem}
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        footer={
          selectedItem ? (
            <>
              <button
                form="item-form"
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
              {selectedItem ? "[EDIT]" : "[CREATE]"}
            </span>
            <h3 className="text-xs font-black uppercase tracking-widest text-white">
              Registry Entry
            </h3>
          </div>
          <p className="text-xs text-zinc-500">
            Enter secure data to populate the POSER global ledger.
          </p>
        </div>
        <form id="item-form" className="space-y-2" action={formAction}>
          <FormField
            name="itemName"
            label="Item Name"
            placeholder="Product Name"
            defaultValue={name}
          />
          <FormField
            name="itemQty"
            label="Quantity"
            placeholder="0"
            defaultValue={qty}
            type="number"
          />
          <FormField
            name="itemPrice"
            label="Price"
            placeholder="0.00"
            defaultValue={price}
            type="number"
          />

          {!selectedItem && (
            <button className="mt-10 w-full bg-[#d4ff00] py-5 text-black text-xs font-black uppercase tracking-[0.3em] hover:brightness-110 transition-all flex items-center justify-center gap-2">
              Confirm Entry <ChevronRight size={14} />
            </button>
          )}
        </form>
      </Modal>
    </main>
  );
};

export default ItemPage;
