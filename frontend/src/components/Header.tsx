// src/components/Header.tsx
import { useState } from "react";
import { Menu } from "lucide-react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/config";
import { useGraphMe } from "../hooks/useGraphMe";
import logo from "../assets/Skanska_logotype_white_RGB.png";

export default function Header({ onMenuToggle, onToggleSidebar }: { onMenuToggle?: () => void; onToggleSidebar?: () => void }) {
  const toggle = onMenuToggle ?? onToggleSidebar ?? (() => {});
  const { instance } = useMsal();
  const { me, isAuthenticated, loading } = useGraphMe();
  const [signingIn, setSigningIn] = useState(false);

  async function handleSignIn() {
    try {
      setSigningIn(true);
      await instance.loginPopup(loginRequest);
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setSigningIn(false);
    }
  }

  return (
    <header
      className="sticky top-0 z-50 border-b text-white"
      style={{ backgroundColor: "#143275" }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-md hover:bg-white/10"
            onClick={toggle}
          >
            <Menu className="h-6 w-6" />
          </button>
          <img
            src={logo}
            alt="Skanska Logo"
            className="h-5 w-auto object-contain align-middle"
          />
        </div>

        {/* Center: Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 font-bold text-lg">
          DataSuite UI
        </div>

        {/* Right: User Section */}
        <div>
          {!isAuthenticated ? (
            <button
              onClick={handleSignIn}
              disabled={signingIn || loading}
              className="flex items-center gap-2 px-3 py-2 rounded-md border bg-white text-gray-900 hover:bg-gray-100"
            >
              <img
                src="https://cdn.worldvectorlogo.com/logos/microsoft.svg"
                alt="Microsoft"
                className="h-4 w-4"
              />
              <span className="text-sm font-medium">
                {signingIn ? "Signing in..." : "Sign in"}
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {me?.photoUrl ? (
                <img
                  src={me.photoUrl}
                  alt={me.displayName || "User"}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                  {me?.displayName?.charAt(0) || "U"}
                </div>
              )}
              <span className="text-sm font-medium">{me?.displayName}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
