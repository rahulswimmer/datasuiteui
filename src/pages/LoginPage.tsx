import { useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../auth/config";

// Simple Microsoft logo SVG
const MicrosoftLogo = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" className={className} aria-hidden="true">
    <rect width="10" height="10" x="1" y="1" fill="#F35325" />
    <rect width="10" height="10" x="12" y="1" fill="#81BC06" />
    <rect width="10" height="10" x="1" y="12" fill="#05A6F0" />
    <rect width="10" height="10" x="12" y="12" fill="#FFBA08" />
  </svg>
);

export default function LoginPage() {
  const { instance } = useMsal();
  const isAuth = useIsAuthenticated();
  const navigate = useNavigate();

  // If already signed in, go straight to integrations
  useEffect(() => {
    if (isAuth) navigate("/integrations", { replace: true });
  }, [isAuth, navigate]);

  const handleSignIn = async () => {
    try {
      await instance.loginPopup(loginRequest);
      navigate("/integrations", { replace: true });
    } catch (err) {
      console.error("MSAL loginPopup error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-skanska-blue text-white">
      <div className="w-full max-w-md p-8 bg-white text-gray-900 rounded-2xl shadow-xl mx-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Welcome to DataSuite UI</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in with your Microsoft account to continue</p>
        </div>

        <button
          onClick={handleSignIn}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-gray-200 bg-white
                     hover:bg-gray-100 text-gray-900 transition text-sm font-medium"
          aria-label="Sign in with Microsoft"
        >
          <MicrosoftLogo className="h-5 w-5" />
          Sign in with Microsoft
        </button>

        <div className="mt-6 text-center text-xs text-gray-500">
          By continuing you agree to the acceptable use policy.
        </div>
      </div>
    </div>
  );
}
