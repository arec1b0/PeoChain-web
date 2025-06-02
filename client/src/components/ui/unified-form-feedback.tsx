import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "./alert";
import { cn } from "@/lib/utils";

export type FeedbackType = "success" | "error" | "warning" | "info";

interface UnifiedFormFeedbackProps {
  type: FeedbackType;
  message: string;
  className?: string;
}

const feedbackConfig = {
  success: {
    icon: CheckCircle,
    className:
      "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
  },
  error: {
    icon: AlertCircle,
    className:
      "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
  },
  warning: {
    icon: AlertTriangle,
    className:
      "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
  },
  info: {
    icon: Info,
    className:
      "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
  },
};

export function UnifiedFormFeedback({
  type,
  message,
  className,
}: UnifiedFormFeedbackProps) {
  const config = feedbackConfig[type];
  const Icon = config.icon;

  return (
    <Alert className={cn(config.className, className)}>
      <Icon className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

// Standardized form error/success patterns
export function useFormFeedback() {
  const getErrorMessage = (error: any): string => {
    if (typeof error === "string") return error;
    if (error?.message) return error.message;
    if (error?.response?.data?.message) return error.response.data.message;
    return "An unexpected error occurred. Please try again.";
  };

  const getSuccessMessage = (action: string): string => {
    const actionMap: Record<string, string> = {
      create: "Successfully created!",
      update: "Successfully updated!",
      delete: "Successfully deleted!",
      save: "Successfully saved!",
      submit: "Successfully submitted!",
      login: "Successfully logged in!",
      register: "Account created successfully!",
      logout: "Successfully logged out!",
    };
    return actionMap[action] || "Operation completed successfully!";
  };

  return { getErrorMessage, getSuccessMessage };
}
