import { useState } from "react";
import IntegrationHealthPage from "./pages/IntegrationHealthPage";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

type NavId = "overview" | "health" | "metrics" | "settings";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavId>("health");

  const toggleSidebar = () => setSidebarOpen(s => !s);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar (slides) */}
      {/* <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active={activeNav}
        onSelect={(id) => { setActiveNav(id); setSidebarOpen(false); }}
      /> */}

      {/* Content shifts on desktop when sidebar open */}
      <div className={`flex-1 min-w-0 transition-[margin] duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-0"}`}>
        <Header onToggleSidebar={toggleSidebar} />
        {activeNav === "health" && <IntegrationHealthPage />}
        {activeNav !== "health" && (
          <main className="p-6">
            <h1 className="text-2xl font-semibold tracking-tight capitalize">{activeNav}</h1>
            <p className="opacity-70 mt-2">This section is a placeholder. Wire it to real pages as you go.</p>
          </main>
        )}
      </div>
    </div>
  );
}
