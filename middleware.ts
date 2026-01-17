import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("auth-token")?.value;
    const { pathname } = request.nextUrl;

    const protectedRoutes = ["/onboarding", "/demo", "/chat", "/dashboard"];
    const authRoutes = ["/login", "/signup"];
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    // If user is NOT logged in
    if (!token) {
        // Redirect to login for ANY restricted page (which is everything except authRoutes)
        if (!isAuthRoute) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("from", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // If user IS logged in
    if (token) {
        // Redirect to home if accessing login/signup pages while authenticated
        if (isAuthRoute) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
