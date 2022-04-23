import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(async () => {
    const { method } = req;

    switch (method) {
      /**
       ** 유저 프로필 사진
       */
      case "GET":
        try {
          const { uid } = req.query;

          const getFetchData = async () => {
            const result = await axios
              .get(
                `https://public-api.tracker.gg/v2/apex/standard/profile/origin/${uid}/sessions`,
                {
                  headers: {
                    "TRN-Api-Key": process.env.TRACKER_KEY as string,
                  },
                }
              )
              .then((res) => res.data.data.items);

            return res.status(200).json(result);
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
