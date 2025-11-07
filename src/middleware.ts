import { NextRequest, NextResponse } from "next/server";

const privateRoutes = [
  "/ofertas-formativas/candidatura",
  "/perfil",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));
  const sessionToken = req.cookies.get("my_app_token")?.value;

  if (isPrivateRoute && !sessionToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
