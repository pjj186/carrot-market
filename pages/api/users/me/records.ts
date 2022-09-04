import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import { Kind } from "@prisma/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const {
    session: { user },
    query: { kind },
  } = req;
  const records = await client.record.findMany({
    where: {
      userId: user?.id,
      kind: kind as Kind,
    },
    include: { product: true },
  });
  res.json({
    ok: true,
    records,
    kind,
  });
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
