"use server";

// Instead of a static import, we do NOT import '@duckdb/node-api' at the top.
// That way, Next.js won't try to bundle it during build.

export async function queryAsync(stmt: string): Promise<Array<object>> {
  if (!stmt) {
    return [];
  }

  // 1) Dynamically import DuckDB. This happens at runtime, on the server.
  const { DuckDBInstance } = await import('@duckdb/node-api');

  // 2) If needed, set HOME env for DuckDB.
  process.env.HOME = '/tmp';

  // 3) Create the DB and connect (await both).
  const db = await DuckDBInstance.create('md:');
  const connection = await db.connect();

  // 4) Return a Promise that wraps the callback.
  return new Promise((resolve, reject) => {
    connection.runAndReadAll(stmt).then((reader) => {
      const rows = reader.getRows();
      resolve(rows);
    }).catch(err => {
      reject(err);
    });
  });
}
