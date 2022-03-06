// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const checkWord = require("check-if-word"),
  checker = checkWord("en");

type ResponseType = {
  totalCount: number;
  validCount: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  let words = [],
    validWords = [];
  if (req.query.words) {
    words = Array.isArray(req.query.words)
      ? req.query.words
      : req.query.words.split(",");
    validWords = checker.getValidWords(words);
  }
  return res
    .status(200)
    .json({ totalCount: words.length, validCount: validWords.length });
}
