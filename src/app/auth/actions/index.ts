"use server";

import { cookies } from "next/headers";
import { customGlobalFetch } from "@/lib/customGlobalFetch";

export async function getSessionInfo() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("my_app_token")?.value;
  return accessToken ? { accessToken } : null;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("my_app_token");
}

export async function validateSession(fingerprint: string): Promise<boolean> {
  const sessionInfo = await getSessionInfo();
  if (!sessionInfo || !sessionInfo.accessToken) return false;

  try {
    const result = await customGlobalFetch<{ valid: boolean }>(
      "/session/validate",
      {
        method: "GET",
        headers: {
          "X-SESSION-TOKEN": sessionInfo.accessToken,
          "X-FINGERPRINT": fingerprint,
        },
      },
      true
    );

    return result.valid === true;
  } catch {
    return false;
  }
}

export async function getMyAccount(fingerprint: string) {
  const sessionInfo = await getSessionInfo();
  if (!sessionInfo || !sessionInfo.accessToken) return null;

  try {
    const result = await customGlobalFetch<any>(
      "/session/me",
      {
        method: "GET",
        headers: {
          "X-SESSION-TOKEN": sessionInfo.accessToken,
          "X-FINGERPRINT": fingerprint,
        },
      },
      true
    );

    return result ?? null;
  } catch {
    return null;
  }
}
