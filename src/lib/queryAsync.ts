"use server";
import { Database } from 'duckdb-lambda-x86';

process.env.HOME = '/tmp';

export async function queryAsync(stmt: string): Promise<Array<object>> {
    if (!stmt) {
        return [];
    }

    return new Promise((resolve, reject) => {
        try {
            const db: Database = new Database("md:");
            const connection = db.connect();
            
            // Execute the query
            const result = connection.all(stmt);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}
