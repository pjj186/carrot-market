import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrotsession",
  password: process.env.IRON_SESSION_PW!,
};

export function withApiSession(fn: any) {
  // API Route에서 session을 받아오기 위한 function
  return withIronSessionApiRoute(fn, cookieOptions); // fn : withHandler
}

export function withSsrSession(handler: any) {
  return withIronSessionSsr(handler, cookieOptions);
}
