import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs';

type ResponseData = {
  message: string
}

async function load_items()
{
  const file = await fs.readFile('./clusters.json', 'utf8');
  return JSON.parse(file);
}

const fdata = load_items()
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  load_items().then((data) => {
    let markers = [];
    for (var i = 0; i < Object.keys(data).length; i++)
    {
      markers.push(
        {
          id: Object.keys(data)[i],
          // @ts-ignore
          position: Object.values(data)[i].center
        }
      )
    }
    //@ts-ignore
    res.status(200).json(markers)
  })
}