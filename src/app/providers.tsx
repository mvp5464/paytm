"use client";

// -- if you need context provider (like RecoilRoot, session provider) then put them all in the seperate file (eg providers1.tsx) -- As in main layout.tsx you can't make them client and without client it won't work.
// -- Then pass this Providers function with some children inside the layout.tsx

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
