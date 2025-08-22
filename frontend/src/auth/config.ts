// src/auth/config.ts
import type { Configuration, PopupRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "921e2874-c77c-4821-bc08-8867bed9791b", // e.g. 11111111-2222-3333-4444-555555555555
    authority: "https://login.microsoftonline.com/33dab507-5210-4075-805b-f2717d8cfa74", // e.g. common | organizations | your-tenant-id
    redirectUri: window.location.origin, // must be added to app registration redirect URIs
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest: PopupRequest = {
  scopes: ["User.Read.All"], // enough for name + photo via Microsoft Graph
};
