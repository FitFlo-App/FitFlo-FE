import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";
import { AuthProvider } from "./utils/auth";
import { DashboardProvider } from "./context/DashboardContext";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <AuthProvider>
      <DashboardProvider>
        <HeroUIProvider navigate={navigate} useHref={useHref}>
          {children}
        </HeroUIProvider>
      </DashboardProvider>
    </AuthProvider>
  );
}
