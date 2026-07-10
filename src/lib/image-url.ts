const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

function isPrivateIPv4(hostname: string) {
  const parts = hostname.split(".").map((part) => Number(part));

  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
    return false;
  }

  const [first, second] = parts;

  return (
    first === 10 ||
    first === 127 ||
    first === 0 ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168) ||
    (first === 169 && second === 254)
  );
}

function isPrivateIPv6(hostname: string) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");

  return host === "::1" || host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe80");
}

export function isLocalNetworkUrl(value: string) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();

    return LOCAL_HOSTNAMES.has(hostname) || isPrivateIPv4(hostname) || isPrivateIPv6(hostname);
  } catch {
    return false;
  }
}

export function isAllowedExternalImageUrl(value: string, allowedHosts: string[]) {
  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" &&
      allowedHosts.includes(url.hostname.toLowerCase()) &&
      !isLocalNetworkUrl(url.href)
    );
  } catch {
    return false;
  }
}

export function toExternalImageProxySrc(value?: string | null) {
  if (!value) return "";

  return `/api/external-image?url=${encodeURIComponent(value)}`;
}
