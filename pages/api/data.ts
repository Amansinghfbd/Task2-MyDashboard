import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';
import Data from '../../models/Data';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method, query } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const filters: Record<string, any> = {};
        const filterableFields: { [key: string]: string } = {
          endYears: 'end_year',
          topics: 'topic',
          sectors: 'sector',
          regions: 'region',
          pestles: 'pestle',
          sources: 'source',
          countries: 'country',
        };
        // Mapping filters from query parameters
        Object.keys(filterableFields).forEach((key) => {
          if (query[key]) {
            // Check if the filter value is not an empty string
            if (query[key] !== "") {
              filters[filterableFields[key]] = query[key];
            } else {
              // Handle empty string case if needed
              filters[filterableFields[key]] = { $in: ["", null] };
            }
          }
        });
  
        const data = await Data.find(filters);
        res.setHeader('Cache-Control', 'no-store');
        res.status(200).json({ success: true, data });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  
  
}
