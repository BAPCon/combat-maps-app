import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs';
import path from 'path';

type ResponseData = {
  message: string
}

async function load_items()
{
  const file = await fs.readFile(path.join(process.cwd(), 'data/clusters.json'), 'utf8');
  return JSON.parse(file);
}

const fdata = load_items()
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  load_items().then((data) => {
    console.log(req.query.id)
    //@ts-ignore
    res.status(200).json(data[req.query.id].items)
  })
}