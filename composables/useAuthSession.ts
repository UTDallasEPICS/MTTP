import { useFetch } from "#app";
import { authClient } from "~~/lib/auth-client";

export function useAuthSession() {
  const relativeFetch = ((url: string, opts?: any) => {
    try {
      if (url.startsWith("http")) url = new URL(url).pathname;
    } catch {}
    return useFetch(url, opts);
  }) as any;
  return authClient.useSession(relativeFetch);
}
