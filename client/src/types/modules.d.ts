// Type declarations for external modules that don't have types available

declare module 'react' {
  import * as React from 'react';
  export = React;
  export as namespace React;
}

declare module 'wouter' {
  export function useLocation(): [string, (to: string, options?: { replace?: boolean }) => void];
  export function useRoute(pattern: string): [boolean, Record<string, string>];
  
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    to?: string;
    children?: React.ReactNode;
  }
  
  export const Link: React.FC<LinkProps>;
  export const Router: React.FC<{ children?: React.ReactNode; base?: string }>;
  export const Route: React.FC<{ path: string; component: React.ComponentType<any> }>;
  export const Switch: React.FC<{ children?: React.ReactNode; location?: string }>;
  export const Redirect: React.FC<{ to: string; replace?: boolean }>;
}

declare module 'framer-motion' {
  export const motion: {
    [key: string]: any;
    div: React.ForwardRefExoticComponent<any>;
    button: React.ForwardRefExoticComponent<any>;
    nav: React.ForwardRefExoticComponent<any>;
    ul: React.ForwardRefExoticComponent<any>;
    li: React.ForwardRefExoticComponent<any>;
    header: React.ForwardRefExoticComponent<any>;
  };
  
  export interface AnimatePresenceProps {
    children?: React.ReactNode;
    initial?: boolean;
    exitBeforeEnter?: boolean;
    onExitComplete?: () => void;
  }
  
  export const AnimatePresence: React.FC<AnimatePresenceProps>;
  
  export interface VariantLabels {
    [key: string]: any;
  }
  
  export type Variant = {
    [key: string]: string | number | { [key: string]: string | number };
  };
  
  export type Variants = {
    [key: string]: Variant;
  };
}

declare module 'lucide-react' {
  import * as React from 'react';

  interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }

  type Icon = React.FC<IconProps>;

  export const Search: Icon;
  export const Menu: Icon;
  export const X: Icon;
  export const Moon: Icon;
  export const Sun: Icon;
  export const ArrowRight: Icon;
  export const ArrowLeft: Icon;
  export const Zap: Icon;
  export const BookOpen: Icon;
  export const ExternalLink: Icon;
  export const Info: Icon;
  export const Download: Icon;
  export const FileText: Icon;
  export const Users: Icon;
  export const Calendar: Icon;
  export const ChevronRight: Icon;
  export const MoreHorizontal: Icon;
  export const Shield: Icon;
  export const Key: Icon;
  export const Clock: Icon;
  export const Terminal: Icon;
  export const Globe: Icon;
  export const CheckCircle: Icon;
  export const AlertCircle: Icon;
  export const DollarSign: Icon;
  
  // Additional icons used in tech-stack-section.tsx
  export const Workflow: Icon;
  export const ShieldCheck: Icon;
  export const KeyRound: Icon;
  export const AlertTriangle: Icon;
  export const ChevronDown: Icon;
  export const ChevronUp: Icon;
  export const Brain: Icon;
  export const HardDrive: Icon;
  export const Layers3: Icon;
  export const Lock: Icon;
}
