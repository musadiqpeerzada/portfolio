import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { maxlength } = req.query;
  const apiKey = process.env.QUOTES_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: 'API key not configured' });
  }

  try {
    const response = await fetch(
      `https://quotes-api.musadiqpeerzada.com/api/quote?apiKey=${apiKey}&maxlength=${
        maxlength || 200
      }`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from external API');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({ message: 'Failed to fetch quote' });
  }
}
