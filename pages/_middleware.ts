import {
  NextRequest,
  NextResponse,
  NextFetchEvent,
  userAgent,
} from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const ua = userAgent(req);
  if (ua.isBot) {
    return new Response("Plz don't be a bot.", { status: 403 });
  }
  if (!req.url.includes("/api")) {
    if (!req.url.includes("/enter") && !req.cookies.get("carrotsession")) {
      return NextResponse.redirect("/enter");
    }
  }
}
