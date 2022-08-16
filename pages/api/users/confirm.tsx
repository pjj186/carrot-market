import { withIronSessionApiRoute } from "iron-session/next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log("api/user/confirm Session : " + JSON.stringify(req.session));
  const { token } = req.body;
  const existsToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  if (!existsToken) return res.status(404).end();
  req.session.user = {
    id: existsToken?.userId,
  };
  await req.session.save();
  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrotSession",
  password: process.env.IRON_SESSION_PW!,
});
