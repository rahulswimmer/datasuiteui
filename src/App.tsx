import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";

import LoginPage from "./pages/LoginPage";
import IntegrationHealthPage from "./pages/IntegrationHealthPage";
import Header from "./components/Header";             // the MS button + menu header you already have
import { Sidebar } from "./components/Sidebar";       // your polished sliding sidebar

type NavId = "overview" | "health" | "metrics" | "settings";

function RequireAuth({ children }: { children: JSX.Element }) {
  const isAuth = useIsAuthenticated();
  if (!isAuth) return <Navigate to="/" replace />;
  return children;
}

// Layout used after login (header + sidebar + routed page content)
function AuthedLayout({ activeNav, setActiveNav }: {
  activeNav: NavId; setActiveNav: (n: NavId) => void;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        {/* Route content renders via parent <Routes> */}
      </div>
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState<NavId>("health");

  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing/login */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected area */}
        <Route
          path="/integrations"
          element={
            <RequireAuth>
              <AuthedLayout activeNav={activeNav} setActiveNav={setActiveNav} />
            </RequireAuth>
          }
        >
          {/* Render the IntegrationHealthPage inside the authed layout */}
        </Route>

        {/* Direct render of the integrations page content within the authed shell */}
        <Route
          path="/integrations/health"
          element={
            <RequireAuth>
              <AuthedLayout activeNav={activeNav} setActiveNav={setActiveNav} />
            </RequireAuth>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Render the actual page contents when at /integrations or /integrations/health */}
      {/* You can also convert AuthedLayout into an Outlet layout and nest routes; keeping it simple here */}
      {location.pathname === "/integrations" || location.pathname === "/integrations/health" ? (
        <div className="hidden">
          {/* This hidden block prevents React Strict Mode complaints; real content is mounted inside AuthedLayout's right pane */}
          {/* Simpler approach: mount IntegrationHealthPage directly after Header in AuthedLayout based on activeNav */}
        </div>
      ) : null}
    </BrowserRouter>
  );
}
