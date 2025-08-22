import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import IntegrationHealthPage from "./pages/IntegrationHealthPage";
import Header from "./components/Header";
import { Sidebar } from "./components/Sidebar";

type NavId = "overview" | "health" | "metrics" | "settings";

function AuthedLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavId>("health");
  const toggleSidebar = () => setSidebarOpen(s => !s);

  return (
    <div className="min-h-screen flex font-sans">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active={activeNav}
        onSelect={(id) => { setActiveNav(id); setSidebarOpen(false); }}
      />
      <div className={`flex-1 min-w-0 transition-[margin] duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-0"}`}>
        <Header onToggleSidebar={toggleSidebar} />
        {/* Routed page content */}
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing/login (no header/sidebar) */}
        <Route path="/" element={<LoginPage />} />

        {/* Authed area (wraps pages with header + sidebar) */}
        <Route path="/app" element={<AuthedLayout />}>
          <Route index element={<Navigate to="integrations" replace />} />
          <Route path="integrations" element={<IntegrationHealthPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
  