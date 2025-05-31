import { motion } from "framer-motion";
import { memo, useCallback, useMemo } from "react";
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

const ActionButton = memo<{
  readonly action: HeroAction;
  readonly index: number;
  readonly onClick: (href: string) => void;
  readonly prefersReducedMotion: boolean;
}>(({ action, index, onClick, prefersReducedMotion }) => {
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
          ? "bg-sage hover:bg-medium-forest text-white font-raleway font-medium text-lg px-8 py-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-sage focus:ring-offset-2"
          : "border-2 border-sage text-forest hover:bg-sage hover:text-white font-raleway font-medium text-lg px-8 py-4 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-sage focus:ring-offset-2"
      }
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {IconComponent && (
        <IconComponent className="mr-2 h-5 w-5" aria-hidden="true" />
      )}
      {action.label}
    </Button>
  );
});

ActionButton.displayName = "ActionButton";

const HeroActions = memo<HeroActionsProps>(({ actions }) => {
  const prefersReducedMotion = useReducedMotion();

  const handleActionClick = useCallback((href: string): void => {
    if (href === "#") {
      console.log("Testnet action clicked");
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
      actions.map((action, index) => (
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
      className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
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
