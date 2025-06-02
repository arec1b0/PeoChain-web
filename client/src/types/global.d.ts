import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// For SVG imports
declare module "*.svg" {
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;
  export default src;
}

// For wouter
declare module "wouter";

// For lucide-react
declare module "lucide-react";
// For framer-motion
declare module "framer-motion";

type FC<P = {}> = React.FC<P>;
type ReactNode = React.ReactNode;
type KeyboardEvent<T = Element> = React.KeyboardEvent<T>;
type MouseEvent<T = Element> = React.MouseEvent<T>;
type FormEvent<T = Element> = React.FormEvent<T>;
type ChangeEvent<T = Element> = React.ChangeEvent<T>;

// Extend Window interface if needed
interface Window {
  // Add any window extensions here
}
