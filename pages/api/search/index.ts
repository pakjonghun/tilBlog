import { readdirSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  const posts = readdirSync("./posts");
  console.log(posts);
  res.end();
};

export default handler;
