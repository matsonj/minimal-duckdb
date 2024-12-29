declare module 'duckdb-lambda-x86' {
  
  export class Database {
      constructor(path?: string);
      constructor(path?: string, config?: object);
      
      connect(): Connection;
      close(): void;
  }
  
  export class Connection {
      all(sql: string): Array<object>;
      exec(sql: string): void;
      close(): void;
  }
}