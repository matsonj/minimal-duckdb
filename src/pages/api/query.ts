import { NextApiRequest, NextApiResponse } from 'next';
import { queryAsync } from '@/lib/queryAsync';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await queryAsync(
      'SELECT *, current_time AS ts FROM nba_box_scores.main.box_scores LIMIT 1;'
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error('DuckDB query error:', error);
    return res.status(500).json({ error: (error as Error).message });
  }
}
