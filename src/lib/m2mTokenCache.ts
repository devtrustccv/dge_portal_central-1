import redis from "./redis";

const TOKEN_KEY = "m2m_token";
const EXPIRES_KEY = "m2m_token_expiry";

export async function getM2MToken(): Promise<string> {
  const [token, expiresAtRaw] = await redis.mget(TOKEN_KEY, EXPIRES_KEY);
  const expiresAt = Number(expiresAtRaw);
  const now = Date.now();
  if (token && expiresAt > now + 60 * 1000) {
    return token;
  }
  return await refreshM2MToken();
}

export async function refreshM2MToken(): Promise<string> {

  console.log("=========== KEVIN =============");
  console.log({
    CLIENT: process.env.API_GATEWAY_CLIENT_ID,
    SCRET: process.env.API_GATEWAY_CLIENT_SECRET
  });
  console.log("========================");

  const res = await fetch(`${process.env.API_URL}/public/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.API_GATEWAY_CLIENT_ID,
      client_secret: process.env.API_GATEWAY_CLIENT_SECRET,
    }),
  });

  if (!res.ok) {
    console.error(`M2M token request failed: ${res.statusText}`, res);
    throw new Error(`M2M token request failed: ${res.statusText}`);
  }

  const data = await res.json();
  if (!data.access_token || !data.expires_in) {
    throw new Error("Invalid token response");
  }

  const now = Date.now();
  const expiresAtNew = now + data.expires_in * 1000;
  await redis.mset({
    [TOKEN_KEY]: data.access_token,
    [EXPIRES_KEY]: expiresAtNew.toString(),
  });

  return data.access_token as string;
}

export async function invalidateM2MTokenCache() {
  await redis.del(TOKEN_KEY, EXPIRES_KEY);
}
