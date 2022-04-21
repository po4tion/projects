import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(async () => {
    const { method } = req;

    switch (method) {
      /**
       ** 유저 정보
       */
      case "GET":
        try {
          const { uid } = req.query;

          const getFetchData = async () => {
            const result = await axios
              .get(
                `https://api.mozambiquehe.re/bridge?version=5&platform=PC&player=${uid}&auth=${process.env.APEX_KEY}`
              )
              .then((res) => res.data);

            return res
              .status(200)
              .json({ global: result.global, realtime: result.realtime });
          };

          await getFetchData();
        } catch (err) {
          return res.status(400).json({ error: err });
        }
        break;
      default:
        return res.status(400).json({ error: "request method error" });
        break;
    }
  });
}

export default handler;
