import { requestWithM2MToken } from "@/lib/requestWithM2MToken";

type JsonLike =
  | Record<string, unknown>
  | unknown[]
  | string
  | number
  | boolean
  | null;

export async function customGlobalFetch<T = JsonLike>(
  endpoint: string,
  options: RequestInit = {},
  isPrivate: boolean = true
): Promise<T> {
  const baseUrl = process.env.API_URL!;
  const url = `${baseUrl}/api-global${endpoint}`;

  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  const baseHeaders: HeadersInit = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...options.headers,
  };

  const fetchOnce = (extraHeaders: HeadersInit = {}) =>
    fetch(url, {
      cache: "no-store",
      ...options,
      headers: {
        ...baseHeaders,
        ...extraHeaders,
      },
    });

  const response = isPrivate
    ? await requestWithM2MToken((token) =>
        fetchOnce({ Authorization: `Bearer ${token}` })
      )
    : await fetchOnce();

  const contentType = response.headers.get("content-type");
  const data = contentType?.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw {
      status: response.status,
      statusText: response.statusText,
      data,
    };
  }

  return data as T;
}
