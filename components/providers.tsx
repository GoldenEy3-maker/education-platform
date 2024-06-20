"use client";

import { getQueryClient } from "@/lib/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import { SessionProvider } from "./session-provider";

export default function Providers({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        <SessionProvider>{children}</SessionProvider>
        <Toaster richColors closeButton />
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
