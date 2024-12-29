import { NextResponse } from 'next/server';
 
export async function GET() {
  // Dynamically import the DuckDB code so it doesn't get bundled
  const { queryAsync } = await import('@/lib/queryAsync');

  const rows = await queryAsync(
    "select current_date as timestamp, *  from nba_box_scores.main.box_scores order by points desc limit 1"
  );
  return NextResponse.json(rows);
}
