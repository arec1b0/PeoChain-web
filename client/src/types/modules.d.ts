// Type declarations for external modules that don't have types available

declare module '@radix-ui/react-slot' {
  import * as React from 'react';
  
  export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    asChild?: boolean;
  }

  export const Slot: React.ForwardRefExoticComponent<
    SlotProps & React.RefAttributes<HTMLElement>
  >;
}

declare module 'react-hook-form' {
  import * as React from 'react';
  
  export type FieldValues = Record<string, any>;
  export type FieldPath<TFieldValues extends FieldValues> = string;
  
  export interface ControllerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  > {
    name: TName;
    control?: any;
    defaultValue?: any;
    rules?: any;
    render: ({
      field,
      fieldState,
      formState,
    }: {
      field: any;
      fieldState: any;
      formState: any;
    }) => React.ReactElement;
  }
  
  export interface UseFormReturn<TFieldValues extends FieldValues = FieldValues> {
    control: any;
    handleSubmit: (onSubmit: (data: TFieldValues) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    formState: {
      errors: Record<string, any>;
      isSubmitting: boolean;
      isDirty: boolean;
      isValid: boolean;
      dirtyFields: Record<string, boolean>;
      touchedFields: Record<string, boolean>;
    };
    register: (name: string, options?: any) => any;
    watch: (name?: string) => any;
    setValue: (name: string, value: any, options?: any) => void;
    getValues: (payload?: any) => any;
    reset: (values?: any, options?: any) => void;
    getFieldState: (name: string, formState?: any) => {
      invalid: boolean;
      isDirty: boolean;
      isTouched: boolean;
      error?: any;
    };
  }

  export function useForm<TFieldValues extends FieldValues = FieldValues>(options?: any): UseFormReturn<TFieldValues>;
  
  export function Controller<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  >(props: ControllerProps<TFieldValues, TName>): React.ReactElement;

  export function FormProvider<TFieldValues extends FieldValues = FieldValues>(props: {
    children: React.ReactNode;
    [key: string]: any;
  }): React.ReactElement;
  
  export function useFormContext<TFieldValues extends FieldValues = FieldValues>(): UseFormReturn<TFieldValues>;
}

declare module 'react' {
  // Extend React namespace to properly support Component class
  interface ComponentClass<P = {}, S = {}> {
    new(props: P, context?: any): Component<P, S>;
    contextType?: Context<any>;
    displayName?: string;
    defaultProps?: Partial<P>;
  }

  interface Component<P = {}, S = {}> {
    constructor(props: P, context?: any);
    setState<K extends keyof S>(
      state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
      callback?: () => void
    ): void;
    forceUpdate(callback?: () => void): void;
    render(): ReactNode;
    readonly props: Readonly<P> & Readonly<{ children?: ReactNode }>;
    state: Readonly<S>;
    context: any;
    refs: {
      [key: string]: ReactInstance
    };
  }

  // Ensure the Component class is properly exported
  export class Component<P = {}, S = {}> {
    constructor(props: P, context?: any);
    setState<K extends keyof S>(
      state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
      callback?: () => void
    ): void;
    forceUpdate(callback?: () => void): void;
    render(): ReactNode;
    readonly props: Readonly<P> & Readonly<{ children?: ReactNode }>;
    state: Readonly<S>;
    context: any;
    refs: {
      [key: string]: ReactInstance
    };
  }

  // Add missing type definitions
  type ReactInstance = Component<any> | Element;
  type ReactNode = Element | string | number | boolean | null | undefined | ReactNodeArray;
  interface ReactNodeArray extends Array<ReactNode> {}
  type ElementType<P = any> = string | ComponentType<P>;
  type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
  interface FunctionComponent<P = {}> {
    (props: P & { children?: ReactNode }): ReactElement | null;
    displayName?: string;
    defaultProps?: Partial<P>;
  }
  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }
  type JSXElementConstructor<P> = ((props: P) => ReactElement | null) | (new (props: P) => Component<P, any>);
  type Key = string | number;
  interface Context<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
    displayName?: string;
  }
  interface Provider<T> {
    (props: ProviderProps<T>): ReactElement | null;
  }
  interface Consumer<T> {
    (props: ConsumerProps<T>): ReactElement | null;
  }
  interface ProviderProps<T> {
    value: T;
    children?: ReactNode;
  }
  interface ConsumerProps<T> {
    children: (value: T) => ReactNode;
  }
  interface ErrorInfo {
    componentStack: string;
  }

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

  export interface IconProps {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }

  export type Icon = React.FC<IconProps>;

  // Common icons used in the project
  export const Search: Icon;
  export const Menu: Icon;
  export const X: Icon;
  export const Moon: Icon;
  export const AlertTriangle: Icon;
  export const ArrowRight: Icon;
  export const RefreshCw: Icon;
  export const ChevronRight: Icon;
  export const Gauge: Icon;
  export const DollarSign: Icon;
  export const Zap: Icon;
  export const Award: Icon;
  export const Smartphone: Icon;
  export const Link2: Icon;
  export const Sun: Icon;
  export const ArrowLeft: Icon;
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
  
  // Added icons for mobile UI optimization
  export const Gauge: Icon;
  export const Award: Icon;
  export const Link2: Icon;
  export const Smartphone: Icon;
  export const TestTube: Icon;
  export const Rocket: Icon;
  export const Book: Icon;
  export const Twitter: Icon;
  export const MessageCircle: Icon;
  export const Github: Icon;
  export const Mail: Icon;
  export const Linkedin: Icon;
}
