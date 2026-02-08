import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.isAnonymous) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  const role = session.user.role;
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/dashboard") && role !== "admin") {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/cart",
    "/wishlist",
    "/checkout/:path*",
    "/account/:path*",
  ],
};
