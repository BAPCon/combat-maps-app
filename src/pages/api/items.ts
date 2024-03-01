import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs';

type ResponseData = {
  message: string
}

async function load_items()
{
  const file = await fs.readFile(process.cwd() + '/src/pages/api/clusters.json', 'utf8');
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
          position: Object.values(data)[i].center
        }
      )
    }
    res.status(200).json(markers)
  })
}