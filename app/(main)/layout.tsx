import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { RoutesMap } from "@/lib/enums";
import { auth } from "@/server/actions/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: React.PropsWithChildren) {
  const [, error] = await auth();

  if (error)
    redirect(`${RoutesMap.Login}?callbackUrl=${headers().get("x-pathname")}`);

  return (
    <div className="flex min-h-svh flex-col md:pl-[17rem]">
      <Sidebar />
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
}
