// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

const whiteList = [
  "0x058922eb8fd54e039249d6578e3892de8216e53b", "test"
]

const leaves = whiteList.map(wl => keccak256(wl))
const tree = new MerkleTree(leaves, keccak256, {sortPairs: true});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{root: string, proof: string[]}>
) {
  const root = tree.getRoot().toString('hex');
  const address = req.query.address as string;
  const leaf = keccak256(address);
  const proof = tree.getHexProof(leaf);

  res.status(200).json({ root, proof });
}
