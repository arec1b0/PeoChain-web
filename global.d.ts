// Global type declarations that match the types listed in tsconfig.json
// We're defining these directly instead of using reference directives

// Node.js global types
declare namespace NodeJS {
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

// Vite client types
interface ImportMeta {
  hot: {
    accept: (callback?: (modules: any) => void) => void;
    dispose: (callback: (data: any) => void) => void;
    data: any;
    invalidate: () => void;
  };
  env: Record<string, boolean>;
  glob: (pattern: string) => Record<string, any>;
  url: string;
}
