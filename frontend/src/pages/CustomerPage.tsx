import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import CustomerList from "../components/CustomerList";
import Modal from "../components/Modal";
import FormField from "../components/FormField";
import { useUser } from "../hooks/useUser";

interface CustomerPageProps {
  activeTab: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const CustomerPage = ({
  activeTab,
  isSidebarOpen,
  setIsSidebarOpen,
}: CustomerPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: customers, isLoading, error } = useUser();

  if (isLoading) {
    return <div>Loading customers...</div>;
  }
  if (error) {
    return <div>Error loading customers</div>;
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
        onAddClick={() => setIsModalOpen(true)}
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
        <StatCard label="Customers" value={customers.length} />
        <StatCard label="Automation" value="83%" />
        <StatCard label="Customer Details Validation" value="100%" />
        <StatCard label="Uptime" value="99.9%" />
      </div>

      {/* Database Section */}
      {activeTab === "customer" ? (
        <CustomerList
          customers={customers || []}
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
          <FormField
            name="custName"
            label="Full Name"
            placeholder="Entity Name"
          />
          <FormField
            name="custAddress"
            label="Postal Address"
            placeholder="Global Location"
          />

          <button className="mt-10 w-full bg-[#d4ff00] py-5 text-black text-xs font-black uppercase tracking-[0.3em] hover:brightness-110 transition-all flex items-center justify-center gap-2">
            Confirm Entry <ChevronRight size={14} />
          </button>
        </form>
      </Modal>
    </main>
  );
};

export default CustomerPage;
