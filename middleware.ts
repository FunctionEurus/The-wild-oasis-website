// import { NextResponse } from "next/server";

// export function middleware(req: Request) {
//   return NextResponse.redirect(new URL("/about", req.url));
// }

import { auth } from "@/app/(lib)/auth";
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
