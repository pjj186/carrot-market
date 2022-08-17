import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log("api/user/me Session : " + JSON.stringify(req.session));

  console.log(req.session.user);
  const profile = await client.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });
  console.log(profile);
  res.json({
    ok: true,
    ...profile,
  });
}

export default withApiSession(
  withHandler({
    method: "GET",
    handler: handler,
  })
);
