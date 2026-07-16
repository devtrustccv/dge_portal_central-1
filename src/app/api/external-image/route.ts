import { NextRequest } from "next/server";
import { isAllowedExternalImageUrl, isLocalNetworkUrl } from "@/lib/image-url";

const ALLOWED_IMAGE_HOSTS = ["sniacapps.gov.cv"];
const MAX_REDIRECTS = 3;
const REQUEST_TIMEOUT_MS = 8000;

async function fetchImage(url: string, redirects = 0): Promise<Response> {
  if (!isAllowedExternalImageUrl(url, ALLOWED_IMAGE_HOSTS)) {
    return new Response("Image source not allowed", { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      redirect: "manual",
      signal: controller.signal,
      cache: "no-store",
    });

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      if (redirects >= MAX_REDIRECTS) {
        return new Response("Too many redirects", { status: 502 });
      }

      const location = response.headers.get("location");
      if (!location) {
        return new Response("Invalid redirect", { status: 502 });
      }

      const redirectUrl = new URL(location, url).href;
      if (isLocalNetworkUrl(redirectUrl)) {
        return new Response("Redirect to local network blocked", { status: 502 });
      }

      return fetchImage(redirectUrl, redirects + 1);
    }

    return response;
  } catch {
    return new Response("Image request failed", { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET(request: NextRequest) {
  const sourceUrl = request.nextUrl.searchParams.get("url");

  if (!sourceUrl) {
    return new Response("Missing image URL", { status: 400 });
  }

  const response = await fetchImage(sourceUrl);

  if (!response.ok || !response.body) {
    return new Response("Image unavailable", {
      status: response.status >= 400 ? response.status : 404,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) {
    return new Response("Unsupported image type", { status: 415 });
  }

  return new Response(response.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "private, max-age=300",
    },
  });
}
