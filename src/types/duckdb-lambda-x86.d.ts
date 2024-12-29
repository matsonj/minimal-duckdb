declare module 'duckdb-lambda-x86' {
  
  export class Database {
      constructor(path?: string);
      constructor(path?: string, config?: object);
      
      connect(): Connection;
      close(): void;
  }
  
  export class Connection {
      // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
      all(sql: string, callback: (err: Error | null, rows: Array<Object>) => void): void;
      exec(sql: string): void;
      close(): void;
  }
}