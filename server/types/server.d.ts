// Type declarations for Node.js modules used in server
declare module 'express' {
  import { Server } from 'http';
  
  export interface Request {
    originalUrl?: string;
  }
  export interface Response {
    sendFile: (path: string) => void;
    send: (body: any) => void;
    json: (body: any) => void;
    status: (code: number) => Response;
  }
  export interface NextFunction {
    (err?: any): void;
  }
  export interface Express {
    use: (path: string | Function, handler?: Function) => void;
    get: (path: string, handler: (req: Request, res: Response) => void) => void;
    post: (path: string, handler: (req: Request, res: Response) => void) => void;
    listen: (port: number, callback?: () => void) => Server;
  }
  function express(): Express;
  namespace express {
    export function static(path: string): Function;
  }
  export default express;
}

declare module 'node' {
  // Basic Node.js global types
  global {
    namespace NodeJS {
      interface Process {
        env: ProcessEnv;
        platform: string;
        version: string;
        cwd(): string;
      }
      
      interface ProcessEnv {
        [key: string]: string | undefined;
        NODE_ENV?: string;
      }
    }
  }
}

declare module 'fs' {
  import * as fs from 'fs';
  export = fs;
}

declare module 'path' {
  import * as path from 'path';
  export = path;
}

declare module 'http' {
  export interface Server {
    listen(port: number, hostname?: string, callback?: () => void): Server;
    close(callback?: (err?: Error) => void): Server;
  }

  export interface IncomingMessage {
    method?: string;
    url?: string;
    headers: Record<string, string | string[] | undefined>;
  }

  export interface ServerResponse {
    statusCode: number;
    setHeader(name: string, value: string | string[]): void;
    end(chunk?: string | Buffer, encoding?: string, callback?: () => void): void;
    write(chunk: string | Buffer, encoding?: string, callback?: () => void): boolean;
  }

  export function createServer(requestListener?: (req: IncomingMessage, res: ServerResponse) => void): Server;
}

declare module 'vite' {
  import { Server } from 'http';
  import { Express } from 'express';
  
  export interface ViteDevServer {
    middlewares: any;
    transformIndexHtml(url: string, html: string): Promise<string>;
    ssrFixStacktrace(e: Error): void;
    listen(port: number, callback?: () => void): void;
  }

  export function createServer(config?: any): Promise<ViteDevServer>;
  
  export function createLogger(options?: any): { 
    info: (msg: string) => void; 
    error: (msg: string, options?: any) => void;
    warn: (msg: string, options?: any) => void;
  };
}

declare module 'vite/client' {
  // Define basic types for Vite client
  interface ImportMeta {
    hot: {
      accept: (callback?: (modules: any) => void) => void;
      dispose: (callback: (data: any) => void) => void;
      data: any;
      invalidate: () => void;
    };
    env: Record<string, boolean>;
    glob: (pattern: string) => Record<string, any>;
  }
}

declare module 'nanoid' {
  export function nanoid(size?: number): string;
}

// Add missing ImportMeta properties
interface ImportMeta {
  url: string;
  dirname?: string;
}

// Add global process definition 
declare namespace NodeJS {
  interface Process {
    env: {
      [key: string]: string | undefined;
      NODE_ENV?: string;
    };
    stdout: {
      write(data: string): boolean;
    };
    stderr: {
      write(data: string): boolean;
    };
  }
}

declare const process: NodeJS.Process & {
  exit(code?: number): never;
};
