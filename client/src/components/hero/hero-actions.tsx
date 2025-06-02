import { motion } from "framer-motion";
import React from "react";
const { memo, useCallback, useMemo } = React;
import { Workflow, TestTube, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroAction } from "@/data/hero-data";
import {
  useKeyboardNavigation,
  useReducedMotion,
} from "@/hooks/use-accessibility";
import { useThrottle } from "@/hooks/use-performance";

interface HeroActionsProps {
  readonly actions: readonly HeroAction[];
}

const iconMap = {
  Workflow,
  TestTube,
  BookOpen,
} as const;

interface ActionButtonProps {
  readonly action: HeroAction;
  readonly index: number;
  readonly onClick: (href: string) => void;
  readonly prefersReducedMotion: boolean;
}

const ActionButton = memo<ActionButtonProps>(
  ({ action, index, onClick, prefersReducedMotion }: ActionButtonProps) => {
    const IconComponent = iconMap[action.icon as keyof typeof iconMap];

    const handleClick = useCallback(() => {
      onClick(action.href);
    }, [onClick, action.href]);

    const { onKeyDown } = useKeyboardNavigation(handleClick);

    const throttledClick = useThrottle(handleClick, 300);

    const ariaLabel =
      action.ariaLabel ||
      `${action.label} - ${action.type === "primary" ? "Primary action" : "Secondary action"}`;

    return (
      <Button
        size="lg"
        variant={action.type === "primary" ? "default" : "outline"}
        onClick={throttledClick}
        onKeyDown={onKeyDown}
        className={
          action.type === "primary"
            ? "bg-sage hover:bg-medium-forest active:bg-dark-forest text-white font-raleway font-medium text-base sm:text-lg" +
              " px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg" +
              " transform transition-all duration-300 hover:scale-105 hover:shadow-xl" +
              " focus:ring-2 focus:ring-sage focus:ring-offset-2" +
              " touch-action-manipulation active:scale-[0.98] active:shadow-md" +
              " min-h-[56px] min-w-[120px] w-full sm:w-auto" +
              " select-none tap-highlight-transparent"
            : "border-2 border-sage text-forest hover:bg-sage hover:text-white active:bg-medium-forest" +
              " font-raleway font-medium text-base sm:text-lg px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl" +
              " transform transition-all duration-300 hover:scale-105 hover:shadow-xl" +
              " focus:ring-2 focus:ring-sage focus:ring-offset-2" +
              " touch-action-manipulation active:scale-[0.98]" +
              " min-h-[56px] min-w-[120px] w-full sm:w-auto" +
              " select-none tap-highlight-transparent"
        }
        mobileOptimized={true}
        aria-label={ariaLabel}
        tabIndex={0}
      >
        {IconComponent && (
          <IconComponent
            className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
            aria-hidden="true"
          />
        )}
        {action.label}
      </Button>
    );
  },
);

ActionButton.displayName = "ActionButton";

const HeroActions = memo<HeroActionsProps>(({ actions }: HeroActionsProps) => {
  const prefersReducedMotion = useReducedMotion();

  const handleActionClick = useCallback((href: string): void => {
    if (href.startsWith("http")) {
      window.open(href, "_blank");
      return;
    }
    window.location.href = href;
  }, []);

  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.6 },
      };

  const memoizedActions = useMemo(
    () =>
      actions.map((action: HeroAction, index: number) => (
        <ActionButton
          key={`${action.label}-${index}`}
          action={action}
          index={index}
          onClick={handleActionClick}
          prefersReducedMotion={prefersReducedMotion}
        />
      )),
    [actions, handleActionClick, prefersReducedMotion],
  );

  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4 sm:px-0 w-full sm:w-auto"
      {...animationProps}
      role="group"
      aria-label="Primary actions"
    >
      {memoizedActions}
    </motion.div>
  );
});

HeroActions.displayName = "HeroActions";

export default HeroActions;
