
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const protectedRoutes = [
    // "/buyer",
    // "/redirect",
    // "/admin",
    // "/student",
    // "/Instructor",
  ];
  const pathName = request.nextUrl.pathname;
  const isAuth =
    request.cookies?.getAll()[2]?.name == "next-auth.session-token";

  const isProtectedRoutes = protectedRoutes.some((route) =>
    pathName.startsWith(route)
  );
  const isAuthRoute = pathName.startsWith("/login");
  if (!isAuth && isProtectedRoutes)
    return NextResponse.redirect(new URL("/login", request.url));
  else if (isAuthRoute && isAuth)
    return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/buyer/:path*",
    // "/redirect",
    // "/student/:path*",
    // "/instructor/:path*",
    // "/admin/:path*",
  ],
};
