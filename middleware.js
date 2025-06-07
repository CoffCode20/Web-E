import { NextResponse } from "next/server";

export function middleware(request) {
  try {
    // Example: Redirect unauthenticated users
    if (!request.cookies.has("auth_token")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Middleware error" }, { status: 500 });
  }
}