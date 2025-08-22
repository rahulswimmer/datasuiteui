import React from "react";
import { Menu } from "lucide-react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../auth/config"; // make sure this file exists (see notes below)

// Accept either prop name so it fits your current App.tsx
type Props = { onToggleSidebar?: () => void; onMenuClick?: () => void };

// Microsoft logo SVG
const MicrosoftLogo = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" className={className} aria-hidden="true" focusable="false">
    <rect width="10" height="10" x="1" y="1" fill="#F35325" />
    <rect width="10" height="10" x="12" y="1" fill="#81BC06" />
    <rect width="10" height="10" x="1" y="12" fill="#05A6F0" />
    <rect width="10" height="10" x="12" y="12" fill="#FFBA08" />
  </svg>
);

export default function Header({ onToggleSidebar, onMenuClick }: Props) {
  const toggle = onToggleSidebar ?? onMenuClick ?? (() => {});
  const { instance, accounts } = useMsal();
  const isAuth = useIsAuthenticated();

  const handleSignIn = async () => {
    try {
      // Opens Microsoft login popup. If admin consent is required, you'll see that prompt after login.
      await instance.loginPopup(loginRequest);
      // Optional: acquire token now (will throw if consent not granted)
      // await instance.acquireTokenSilent({ ...loginRequest, account: accounts[0] });
    } catch (err) {
      console.error("MSAL loginPopup error:", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-skanska-blue text-white">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: menu + product name */}
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-md hover:bg-white/10 transition"
            onClick={toggle}
            aria-label="Toggle navigation"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="font-bold text-lg">DataSuite UI</div>
        </div>

        {/* Right: Microsoft sign-in */}
        <div className="flex items-center gap-3">
          {!isAuth ? (
            <button
              onClick={handleSignIn}
              // White button; on hover bg turns light gray, text stays dark
              className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900 transition"
              aria-label="Sign in with Microsoft"
            >
              <MicrosoftLogo className="h-5 w-5" />
              <span className="text-sm font-medium">Sign in</span>
            </button>
          ) : (
            // If you’re already authenticated, you can replace this with profile UI later
            <div className="text-sm opacity-90">Signed in</div>
          )}
        </div>
      </div>
    </header>
  );
}
