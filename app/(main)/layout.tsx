import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-svh flex-col md:pl-[17rem]">
      <Sidebar />
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
}
