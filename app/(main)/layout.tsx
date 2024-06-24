import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { SessionProvider } from "@/components/session-provider";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-svh flex-col md:pl-[17rem]">
      <SessionProvider>
        <Sidebar />
        <Header />
        <div className="flex-1">{children}</div>
      </SessionProvider>
    </div>
  );
}
