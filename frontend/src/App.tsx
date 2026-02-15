import { useState } from "react";
import Sidebar from "./components/Sidebar";
import CustomerPage from "./pages/CustomerPage"; // Import the new CustomerPage

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("customer");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 antialiased flex">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Conditionally render CustomerPage. We can add other pages here later */}
      {activeTab === "customer" && (
        <CustomerPage
          activeTab={activeTab}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
    </div>
  );
}