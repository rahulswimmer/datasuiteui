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
      if (!isAuth) { setMe(null); return; }
      setLoading(true);
      try {
        const token = await instance.acquireTokenSilent({ ...loginRequest, account: account || undefined });
        const headers = { Authorization: `Bearer ${token.accessToken}` };

        // 1) basic profile
        const meResp = await fetch("https://graph.microsoft.com/v1.0/me", { headers });
        const meJson = await meResp.json();

        // 2) photo (might not exist)
        let photoUrl: string | undefined;
        try {
          const photoResp = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", { headers });
          if (photoResp.ok) {
            const blob = await photoResp.blob();
            photoUrl = URL.createObjectURL(blob);
          }
        } catch { /* ignore */ }

        if (!disposed) {
          setMe({
            displayName: meJson.displayName,
            mail: meJson.mail,
            userPrincipalName: meJson.userPrincipalName,
            photoUrl,
          });
        }
      } catch {
        if (!disposed) setMe(null);
      } finally {
        if (!disposed) setLoading(false);
      }
    }
    run();
    return () => { disposed = true; };
  }, [isAuth, instance, account]);

  return { me, loading, isAuthenticated: isAuth };
}
