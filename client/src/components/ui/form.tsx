"use client";

import React from "react";
import { Slot } from "./slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { useIsMobile, useTouch } from "@/hooks";

// Simplified version of LabelPrimitive for TypeScript compatibility
const LabelPrimitive = {
  Root: Label,
  displayName: "Label",
};

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to optimize for mobile devices
   */
  mobileOptimized?: boolean;
  /**
   * Additional className for styling
   */
  className?: string;
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  (
    { className, mobileOptimized = true, ...props }: FormItemProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const id = React.useId();
    const isMobile = useIsMobile();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={cn(
            "space-y-2",
            // Increase spacing on mobile for better touch targets
            mobileOptimized && isMobile && "space-y-3 mb-4",
            className,
          )}
          {...props}
        />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Whether to optimize for mobile devices
   */
  mobileOptimized?: boolean;
  /**
   * Additional className for styling
   */
  className?: string;
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  (
    { className, mobileOptimized = true, ...props }: FormLabelProps,
    ref: React.Ref<HTMLLabelElement>,
  ) => {
    const { error, formItemId } = useFormField();
    const isMobile = useIsMobile();

    return (
      <Label
        ref={ref}
        className={cn(
          // Error state
          error && "text-destructive",
          // Mobile optimizations
          mobileOptimized &&
            isMobile &&
            "text-base py-1 mb-1 min-h-[32px] inline-block touch-action-manipulation",
          // Additional touch optimization
          "tap-highlight-transparent select-none",
          className,
        )}
        mobileOptimized={mobileOptimized}
        htmlFor={formItemId}
        {...props}
      />
    );
  },
);
FormLabel.displayName = "FormLabel";

interface FormControlProps extends React.ComponentPropsWithoutRef<typeof Slot> {
  /**
   * Whether to optimize for mobile devices
   */
  mobileOptimized?: boolean;
}

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  FormControlProps
>(
  (
    { mobileOptimized = true, ...props }: FormControlProps,
    ref: React.Ref<React.ElementRef<typeof Slot>>,
  ) => {
    const { error, formItemId, formDescriptionId, formMessageId } =
      useFormField();
    const isMobile = useIsMobile();
    const touchHandlers = useTouch({
      provideFeedback: true,
      feedbackDuration: 150,
      onlyOnMobile: true,
    });

    // Only add touch handlers if we're on mobile and want mobile optimization
    const mobileProps =
      mobileOptimized && isMobile
        ? {
            onTouchStart: touchHandlers.onTouchStart,
            onTouchEnd: touchHandlers.onTouchEnd,
            onTouchCancel: touchHandlers.onTouchCancel,
            className: cn(
              touchHandlers.className,
              "touch-action-manipulation tap-highlight-transparent",
            ),
          }
        : {};

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={
          !error
            ? `${formDescriptionId}`
            : `${formDescriptionId} ${formMessageId}`
        }
        aria-invalid={!!error}
        {...mobileProps}
        {...props}
      />
    );
  },
);
FormControl.displayName = "FormControl";

interface FormTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Whether to optimize for mobile devices
   */
  mobileOptimized?: boolean;
  /**
   * Additional className for styling
   */
  className?: string;
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

const FormDescription = React.forwardRef<HTMLParagraphElement, FormTextProps>(
  (
    { className, mobileOptimized = true, ...props }: FormTextProps,
    ref: React.Ref<HTMLParagraphElement>,
  ) => {
    const { formDescriptionId } = useFormField();
    const isMobile = useIsMobile();

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn(
          // Base styles
          "text-sm text-muted-foreground",
          // Mobile optimizations for better readability
          mobileOptimized &&
            isMobile &&
            "text-base sm:text-sm leading-relaxed py-1",
          // Additional touch optimization
          "tap-highlight-transparent select-none",
          className,
        )}
        {...props}
      />
    );
  },
);
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<HTMLParagraphElement, FormTextProps>(
  (
    {
      className,
      children,
      mobileOptimized = true,
      ...props
    }: FormTextProps & { children?: React.ReactNode },
    ref: React.Ref<HTMLParagraphElement>,
  ) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message ?? "") : children;
    const isMobile = useIsMobile();

    if (!body) {
      return null;
    }

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn(
          // Base styles
          "text-sm font-medium text-destructive",
          // Mobile optimizations for better visibility and touch
          mobileOptimized &&
            isMobile &&
            "text-base sm:text-sm py-1 mb-1 leading-relaxed",
          // Add animation for better feedback
          "animate-in fade-in duration-200",
          // Additional touch optimization
          "tap-highlight-transparent select-none",
          className,
        )}
        role="alert"
        aria-live="polite"
        {...props}
      >
        {body}
      </p>
    );
  },
);
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  // Export the types for consumers
  type FormItemProps,
  type FormLabelProps,
  type FormControlProps,
  type FormTextProps,
};
