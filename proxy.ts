// import { NextRequest, NextResponse } from "next/server";

// const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "evento.com";

// function getTenantFromHost(host: string) {
//   // Remove port
//   const hostname = host.split(":")[0].toLowerCase();

//   // --------------------------------------------------
//   // LOCAL DEVELOPMENT
//   // aws.localhost:3000
//   // nss.localhost:3000
//   // --------------------------------------------------

//   if (hostname.endsWith(".localhost")) {
//     const subdomain = hostname.replace(".localhost", "");

//     if (
//       subdomain &&
//       subdomain !== "www" &&
//       subdomain !== "localhost"
//     ) {
//       return subdomain;
//     }

//     return null;
//   }

//   // --------------------------------------------------
//   // PRODUCTION
//   // aws.evento.com
//   // nss.evento.com
//   // --------------------------------------------------

//   const rootDomain = ROOT_DOMAIN.toLowerCase();

//   if (hostname === rootDomain || hostname === `www.${rootDomain}`) {
//     return null;
//   }

//   if (hostname.endsWith(`.${rootDomain}`)) {
//     const subdomain = hostname.slice(
//       0,
//       -(rootDomain.length + 1)
//     );

//     if (
//       subdomain &&
//       subdomain !== "www"
//     ) {
//       return subdomain;
//     }
//   }

//   return null;
// }

// export function proxy(request: NextRequest) {
//   const url = request.nextUrl.clone();

//   const host =
//     request.headers.get("host") ||
//     request.headers.get("x-forwarded-host") ||
//     "";

//   const tenant = getTenantFromHost(host);

//   // --------------------------------------------------
//   // No tenant → normal Evento application
//   // --------------------------------------------------

//   if (!tenant) {
//     return NextResponse.next();
//   }

//   // --------------------------------------------------
//   // Prevent internal tenant route from being accessed
//   // directly by users.
//   //
//   // Example:
//   // aws.evento.com/tenant
//   // --------------------------------------------------

//   if (url.pathname.startsWith("/tenant")) {
//     return NextResponse.next();
//   }

//   // --------------------------------------------------
//   // Don't rewrite framework/API/static requests
//   // --------------------------------------------------

//   if (
//     url.pathname.startsWith("/api") ||
//     url.pathname.startsWith("/_next") ||
//     url.pathname.startsWith("/favicon") ||
//     url.pathname.includes(".")
//   ) {
//     return NextResponse.next();
//   }

//   // --------------------------------------------------
//   // Rewrite tenant request
//   //
//   // aws.evento.com/
//   //          ↓
//   // /tenant?tenant=aws
//   //
//   // Browser URL remains:
//   // aws.evento.com/
//   // --------------------------------------------------

//   url.pathname = "/tenant";

//   url.searchParams.set("tenant", tenant);

//   return NextResponse.rewrite(url);
// }

// export const config = {
//   matcher: [
//     /*
//      * Run proxy on all application routes except:
//      * - API
//      * - Next internals
//      * - static files
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//   ],
// };

import { NextRequest, NextResponse } from "next/server";

const TENANT_DOMAIN = "localhost";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const host = hostname.split(":")[0];

  let slug: string | null = null;

  // Local development
  // aws.localhost:3000
  // nss.localhost:3000
  // gdsc.localhost:3000
  if (host.endsWith(`.${TENANT_DOMAIN}`)) {
    slug = host.replace(`.${TENANT_DOMAIN}`, "");
  }

  // No tenant
  if (!slug || slug === "www") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  // Prevent infinite rewrite
  if (url.pathname.startsWith("/tenant")) {
    return NextResponse.next();
  }

  // Pass slug to tenant page
  url.pathname = "/tenant";
  url.searchParams.set("slug", slug);

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};