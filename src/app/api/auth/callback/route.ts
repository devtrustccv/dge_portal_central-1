import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { toAbsoluteSiteUrl } from "@/lib/central-auth";


export async function GET(request: NextRequest) {
  const tempToken = new URL(request.url).searchParams.get("access_token");

  const homeUrl = toAbsoluteSiteUrl("/");

  if (!tempToken) {
    return NextResponse.redirect(homeUrl);
  }

  const cookieStore = await cookies();
  const redirectPath = cookieStore.get("redirect_path")?.value;
   const absoluteRedirectUrl = toAbsoluteSiteUrl(redirectPath);
  const isDev = process.env.NODE_ENV !== "production";

  const response = new NextResponse(null, {
    status: 302,
    headers: {
      Location: absoluteRedirectUrl,
    },
  });

  response.cookies.set("session_token", tempToken, {
    httpOnly: true,
    path: "/",
    sameSite: isDev ? "lax" : "none",
    secure: !isDev,
  });

  response.cookies.set("redirect_path", "", {
    path: "/",
    maxAge: -1,
  });
  response.cookies.set("my_app_token", "", {
    path: "/",
    maxAge: -1,
  });

  return response;
}
