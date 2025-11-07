import { requestWithM2MToken } from "@/lib/requestWithM2MToken";

export async function customFetchBaseAPI<T>(
    endpoint: string,
    options: RequestInit = {},
    isPrivate: boolean = true
): Promise<T> {
  const baseUrl = process.env.API_URL!;
  const url = `${baseUrl}/api-base-service${endpoint}`;

  const baseHeaders: HeadersInit = {
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
    const message = response.statusText || `Erro ${response.status}`;
    console.log({ message, response });
    const apiError = new Error(message);
    (apiError as any).status = response.status;
    (apiError as any).data = data;
    throw apiError;
  }

  return data as T;
}
