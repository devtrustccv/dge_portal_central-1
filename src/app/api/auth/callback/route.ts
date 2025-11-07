import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const tempToken = url.searchParams.get("access_token");
  if (!tempToken) {
    return NextResponse.redirect(new URL("/", url.origin));
  }

  const cookieStore = await cookies();
  const redirectPath = cookieStore.get("redirect_path")?.value || "/";
  const absoluteRedirectUrl = new URL(redirectPath, url.origin);
  const isDev = process.env.NODE_ENV !== "production";

  const response = new NextResponse(null, {
    status: 302,
    headers: {
      Location: absoluteRedirectUrl.toString(),
    },
  });

  response.cookies.set("my_app_token", tempToken, {
    httpOnly: true,
    path: "/",
    sameSite: isDev ? "lax" : "none",
    secure: !isDev,
  });

  response.cookies.set("redirect_path", "", {
    path: "/",
    maxAge: -1,
  });

  return response;
}
