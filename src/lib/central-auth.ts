import { setCookie } from "nookies";

/** Origin público do portal — sempre absoluto, sem trailing slash. */
export function getSiteOrigin(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  if (!raw) {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    throw new Error("NEXT_PUBLIC_SITE_URL não definido");
  }
  try {
    return new URL(raw).origin;
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL inválido: ${raw}`);
  }
}

/** Base (Krê+) — sempre absoluto, sem trailing slash. */
export function getCentralBaseUrl(): string {
  const raw = (
    process.env.NEXT_PUBLIC_CENTRAL_BASE_URL ||
    process.env.NEXT_PUBLIC_DGE_CENTRAL_URL ||
    ""
  ).trim();
  if (!raw) {
    throw new Error("NEXT_PUBLIC_CENTRAL_BASE_URL não definido");
  }
  try {
    return new URL(raw).origin;
  } catch {
    throw new Error(`NEXT_PUBLIC_CENTRAL_BASE_URL inválido: ${raw}`);
  }
}

/**
 * Converte path relativo ou URL para URL absoluta do portal.
 * Nunca devolve relativo.
 */
export function toAbsoluteSiteUrl(pathOrUrl?: string | null): string {
  const site = getSiteOrigin();
  if (!pathOrUrl || pathOrUrl === "/") {
    return `${site}/`;
  }

  try {
    // Já absoluto
    const asUrl = new URL(pathOrUrl);
    return asUrl.toString();
  } catch {
    // Relativo → absoluto no site
    const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
    return new URL(path, `${site}/`).toString();
  }
}

/**
 * Login centralizado via Base (external/login).
 * - `redirectPath` (opcional): para onde voltar após login (path ou URL)
 * - cookie `redirect_path` e `redirectUrl` do Base são sempre absolutos
 */
export function startCentralLogin(redirectPath?: string | null) {
  const returnTo = toAbsoluteSiteUrl(redirectPath);
  const siteOrigin = getSiteOrigin();
  const centralBase = getCentralBaseUrl();

  setCookie(null, "redirect_path", returnTo, {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  const loginUrl = new URL("/api/auth/external/login", centralBase);
  loginUrl.searchParams.set("redirectUrl", `${siteOrigin}/`);

  window.location.href = loginUrl.toString();
}
