"use client";

import { useSession } from "@/components/session-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { RoutesMap } from "@/lib/enums";
import Link from "next/link";

export default function Home() {
  const { session, isSessionLoading } = useSession();

  return (
    <main>
      <h1>HomePage</h1>
      <ThemeToggle />
      <nav>
        <Link href={RoutesMap.Login}>Login</Link>
      </nav>
      {!isSessionLoading ? (
        <pre>{JSON.stringify(session, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
