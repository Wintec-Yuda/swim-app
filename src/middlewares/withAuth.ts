import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse, NextFetchEvent, NextMiddleware } from "next/server";

const authPage = ["auth"];
const onlyAdmin = ["teams", "events"];
const onlyUser = ["athletes"];

export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname.split("/")[1];

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token && !authPage.includes(pathname)) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if (token) {
        switch (token.role) {
          case "admin":
            if (!onlyAdmin.includes(pathname)) {
              return NextResponse.redirect(new URL("/teams", req.url));
            }
            break;
          case "user":
            if (!onlyUser.includes(pathname)) {
              return NextResponse.redirect(new URL("/athletes", req.url));
            }
            break;
          default:
            break;
        }

        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/athletes", req.url));
        }
      }
    }

    return middleware(req, next);
  };
}
