import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { ResponseType } from "@libs/server/withHandler";
import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import mail from "@sendgrid/mail";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

mail.setApiKey(process.env.SENDGRID_KEY!);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: phone } : email ? { email: email } : null;

  if (!user) {
    res.status(400).json({
      ok: false,
    });
  }
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload: payload,
      user: {
        // 해당하는 UserId와 연결
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHOEN!,
    //   body: `Your Login Token is ${payload}.`,
    // });
    // console.log(message);
  } else if (email) {
    // const email = await mail.send({
    //   from: "pjj186@naver.com",
    //   to: "pjj186@naver.com",
    //   subject: "Yor Carrot Market Verification Email",
    //   text: `Your Token is ${payload}`,
    //   html: `<strong>Your Token is ${payload}</strong>`,
    // });
    // console.log(email);
  }
  res.json({
    ok: true,
  });
}

export default withHandler({
  methods: ["POST"],
  handler: handler,
  isPrivate: false,
});
