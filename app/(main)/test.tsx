import { auth } from "@/server/actions/auth";

export async function Test() {
  const [session] = await auth();

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
