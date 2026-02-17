import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import CustomerPage from "./pages/CustomerPage";
import ItemPage from "./pages/ItemPage"; // Import ItemPage
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("customer");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 antialiased flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {activeTab === "customer" && (
          <CustomerPage
            activeTab={activeTab}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}
        {activeTab === "item" && ( // Add conditional rendering for ItemPage
          <ItemPage
            activeTab={activeTab}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}
      </div>
    </QueryClientProvider>
  );
}
