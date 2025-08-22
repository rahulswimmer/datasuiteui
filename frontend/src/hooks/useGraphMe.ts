// src/hooks/useGraphMe.ts
import { useEffect, useState } from "react";
import { useMsal, useAccount, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../auth/config";

type Me = { displayName?: string; mail?: string; userPrincipalName?: string; photoUrl?: string };

export function useGraphMe() {
  const isAuth = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || null);
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let disposed = false;
    async function run() {
      if (!isAuth || !account) { setMe(null); return; }
      setLoading(true);
      try {
        const token = await instance.acquireTokenSilent({ ...loginRequest, account });
        const headers = { Authorization: `Bearer ${token.accessToken}` };

        // Profile (User.Read.All covers this too)
        const meResp = await fetch("https://graph.microsoft.com/v1.0/me", { headers });
        const meJson = await meResp.json();

        // Optional photo
        let photoUrl: string | undefined;
        const photoResp = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", { headers });
        if (photoResp.ok) {
          const blob = await photoResp.blob();
          photoUrl = URL.createObjectURL(blob);
        }

        if (!disposed) {
          setMe({
            displayName: meJson.displayName,
            mail: meJson.mail,
            userPrincipalName: meJson.userPrincipalName,
            photoUrl,
          });
        }
      } catch (e: any) {
        // Common: AADSTS65001 / 65004 if admin consent not granted yet
        console.warn("Graph call failed; likely missing admin consent", e);
        if (!disposed) setMe(null);
      } finally {
        if (!disposed) setLoading(false);
      }
    }
    run();
    return () => { disposed = true; };
  }, [isAuth, account, instance]);

  return { me, loading, isAuthenticated: isAuth };
}
