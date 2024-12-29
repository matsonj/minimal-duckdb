"use server";
import { Database } from 'duckdb-lambda-x86'

process.env.HOME = '/tmp';

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export async function queryAsync(stmt: string): Promise<Array<Object>> {
    if (stmt === "") {
        return [];
    }

    return new Promise((resolve, reject) => {
        const db: Database = new Database("md:")
        const connection = db.connect()
        // connection.all(`SET home_directory='/tmp';`)
        // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
        connection.all(stmt, ((err: Error | null, rows: Array<Object>) => {
            if(err) {
                reject(err)
            }
            resolve(rows)
        }))
    })
}
