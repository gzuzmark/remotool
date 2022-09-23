import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: 'pls use with a slug' }));

    return;
  }

  const data = await prisma.candidateRecruiterLink.findFirst({
    where: {
      matchId: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: 'slug not found' }));

    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=1000000000, stale-while-revalidate');

  return res.json(data);
};
