import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export default withAuth(
  async function middleware(request: NextRequest) {
    const protectedRoutes = ["addcourse"];
    const pathName = request.nextUrl.pathname;
    const isAuth = await getToken({ req: request });
    const isProtectedRoutes = protectedRoutes.some((route) =>
      pathName.startsWith(route)
    );
    const isAuthRoute = pathName.startsWith("/auth");
    if (!isAuth && isProtectedRoutes)
      return NextResponse.redirect(new URL("/api/auth/signin", request.url));

    if (isAuthRoute && isAuth)
      return NextResponse.redirect(new URL("/", request.url));

    // return NextResponse.redirect(new URL(request.url));
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/","/auth",'/auth/:path*   ',"/:path*"],
};
