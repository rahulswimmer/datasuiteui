// src/pages/LoginPage.tsx
import { useEffect, useState } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../auth/config";
import logo from "../assets/Skanska_logotype_blue_RGB.png";

const MicrosoftLogo = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" className={className} aria-hidden="true">
    <rect width="10" height="10" x="1" y="1" fill="#F35325" />
    <rect width="10" height="10" x="12" y="1" fill="#81BC06" />
    <rect width="10" height="10" x="1" y="12" fill="#05A6F0" />
    <rect width="10" height="10" x="12" y="12" fill="#FFBA08" />
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const isAuth = useIsAuthenticated();
  const { instance } = useMsal();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // If already signed in, skip straight to the app
  useEffect(() => {
    if (isAuth) navigate("/app/integrations", { replace: true });
  }, [isAuth, navigate]);

  async function handleSignIn() {
    setErr(null);
    setLoading(true);
    try {
      await instance.loginPopup(loginRequest); // requests User.Read.All (per your app registration)
      navigate("/app/integrations", { replace: true });
    } catch (e: any) {
      // Common admin-consent / policy errors bubble here
      const msg =
        e?.errorMessage ||
        e?.message ||
        "Sign-in failed. If your tenant requires admin approval for User.Read.All, please contact an admin.";
      setErr(msg);
      // stay on this page so user can retry
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-skanska-blue text-white">
      <div className="w-full max-w-md p-8 bg-white text-gray-900 rounded-2xl shadow-xl mx-4">
        <div className="text-center mb-6">
          <img src={logo} alt="Skanska Logo" className="mx-auto h-12 mb-4" />
          <h1 className="text-2xl font-semibold">Welcome to DataSuite UI</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in with your Microsoft account to continue
          </p>
        </div>

        {err && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 text-red-800 text-sm p-3">
            {err}
          </div>
        )}

        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-gray-200 bg-white
                     hover:bg-gray-100 text-gray-900 transition text-sm font-medium disabled:opacity-60"
          aria-label="Sign in with Microsoft"
        >
          <MicrosoftLogo />
          {loading ? "Signing in…" : "Sign in with Microsoft"}
        </button>

        <div className="mt-6 text-center text-xs text-gray-500">
          By continuing you agree to the acceptable use policy.
        </div>
      </div>
    </div>
  );
}
