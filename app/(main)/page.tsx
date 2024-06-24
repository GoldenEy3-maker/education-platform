import { ThemeToggle } from "@/components/theme-toggle";
import { RoutesMap } from "@/lib/enums";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container-grid py-4">
      <h1>HomePage</h1>
      <ThemeToggle />
      <nav>
        <Link href={RoutesMap.Login}>Login</Link>
      </nav>
    </main>
  );
}
