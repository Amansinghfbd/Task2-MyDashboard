import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';
import Data from '../../models/Data';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const distinctFields = await Promise.all([
      Data.distinct('end_year'),
      Data.distinct('topic'),
      Data.distinct('sector'),
      Data.distinct('region'),
      Data.distinct('pestle'),
      Data.distinct('source'),
      Data.distinct('country'),
    ]);

    const [endYears, topics, sectors, regions, pestles, sources, countries] = distinctFields;

    res.status(200).json({
      success: true,
      filters: {
        endYears,
        topics,
        sectors,
        regions,
        pestles,
        sources,
        countries,
      },
    });
  }catch (error) {
  if (error instanceof Error) {
    res.status(500).json({ success: false, message: error.message });
  } else {
    res.status(500).json({ success: false, message: "An unknown error occurred" });
  }
}
}

export default handler;
