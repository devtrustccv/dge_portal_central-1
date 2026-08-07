import { setCookie } from "nookies";

/** Hosts de bind do Docker/Next — nunca usar em redirects do browser. */
const BIND_ONLY_HOSTS = new Set(["0.0.0.0", "::", "[::]"]);

function isBindOnlyHost(hostname: string): boolean {
  return BIND_ONLY_HOSTS.has(hostname);
}

function originFromRaw(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    if (isBindOnlyHost(url.hostname)) return null;
    return url.origin;
  } catch {
    return null;
  }
}

/**
 * Origin público do portal (`NEXT_PUBLIC_SITE_URL`).
 * Em servidor nunca cai para request/host interno — evita 0.0.0.0:3000.
 */
export function getSiteOrigin(): string {
  const fromEnv = originFromRaw(process.env.NEXT_PUBLIC_SITE_URL || "");
  if (fromEnv) return fromEnv;

  // Só no browser (login client-side) — nunca no callback API
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  throw new Error(
    "NEXT_PUBLIC_SITE_URL não definido ou inválido (não use 0.0.0.0)"
  );
}

/** Base (Krê+) — sempre absoluto. */
export function getCentralBaseUrl(): string {
  const raw = (
    process.env.NEXT_PUBLIC_CENTRAL_BASE_URL ||
    process.env.NEXT_PUBLIC_DGE_CENTRAL_URL ||
    ""
  ).trim();
  const origin = originFromRaw(raw);
  if (!origin) {
    throw new Error("NEXT_PUBLIC_CENTRAL_BASE_URL não definido ou inválido");
  }
  return origin;
}


export function toAbsoluteSiteUrl(pathOrUrl?: string | null): string {
  const site = getSiteOrigin();

  if (!pathOrUrl || pathOrUrl === "/") {
    return `${site}/`;
  }

  try {
    const asUrl = new URL(pathOrUrl);
    if (asUrl.origin !== site || isBindOnlyHost(asUrl.hostname)) {
      return new URL(
        `${asUrl.pathname}${asUrl.search}${asUrl.hash}`,
        `${site}/`
      ).toString();
    }
    return asUrl.toString();
  } catch {
    const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
    return new URL(path, `${site}/`).toString();
  }
}


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
