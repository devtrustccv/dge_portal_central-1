import {
  getM2MToken,
  refreshM2MToken,
  invalidateM2MTokenCache,
} from "./m2mTokenCache";

type FetchLike = (token: string) => Promise<Response>;

export async function requestWithM2MToken(
  fetchFn: FetchLike
): Promise<Response> {
  let token = await getM2MToken();
  let res = await fetchFn(token);

  if (isUnauthorized(res)) {
    await invalidateM2MTokenCache();
    token = await refreshM2MToken();
    res = await fetchFn(token);
  }
  return res;
}

function isUnauthorized(res: Response): boolean {
  return res.status === 401 || res.status === 403;
}
