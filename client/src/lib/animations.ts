// Advanced Animation System - Declarative, Accessible, Performance-Optimized
import { designTokens } from "./tokens";
import { Variants, Transition, MotionProps } from "framer-motion";

// Animation Configuration Types
export interface AnimationConfig {
  readonly duration: keyof typeof designTokens.animation.duration;
  readonly easing: keyof typeof designTokens.animation.easing;
  readonly delay?: number;
  readonly spring?: keyof typeof designTokens.animation.spring;
}

export interface AccessibleAnimationConfig extends AnimationConfig {
  readonly respectsReducedMotion: boolean;
  readonly fallback?: Variants;
}

// Standardized Animation Variants
export const standardAnimations = {
  // Page Transitions
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  } as Variants,

  pageSlide: {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
  } as Variants,

  // Component Animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } as Variants,

  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  } as Variants,

  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  } as Variants,

  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  } as Variants,

  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  } as Variants,

  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  } as Variants,

  // Micro-interactions
  buttonHover: {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  } as Variants,

  cardHover: {
    rest: { y: 0, boxShadow: designTokens.elevation.shadow.md },
    hover: { y: -4, boxShadow: designTokens.elevation.shadow.lg },
  } as Variants,

  iconSpin: {
    animate: { rotate: 360 },
  } as Variants,

  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  } as Variants,

  // Loading States
  skeleton: {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  } as Variants,

  spinner: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  } as Variants,

  // Stagger Animations
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as Variants,

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  } as Variants,
} as const;

// Animation Transition Presets
export const transitionPresets = {
  fast: {
    duration:
      parseFloat(designTokens.animation.duration.fast.replace("ms", "")) / 1000,
    ease: designTokens.animation.easing.out,
  },
  normal: {
    duration:
      parseFloat(designTokens.animation.duration.normal.replace("ms", "")) /
      1000,
    ease: designTokens.animation.easing.inOut,
  },
  slow: {
    duration:
      parseFloat(designTokens.animation.duration.slow.replace("ms", "")) / 1000,
    ease: designTokens.animation.easing.out,
  },
  spring: {
    type: "spring" as const,
    stiffness: designTokens.animation.spring.gentle.tension,
    damping: designTokens.animation.spring.gentle.friction,
  },
  bouncy: {
    type: "spring" as const,
    stiffness: designTokens.animation.spring.wobbly.tension,
    damping: designTokens.animation.spring.wobbly.friction,
  },
} as const;

// Accessibility-aware animation hook
export function useAccessibleAnimation(
  baseVariants: Variants,
  config: AccessibleAnimationConfig = {
    duration: "normal",
    easing: "inOut",
    respectsReducedMotion: true,
  },
): { variants: Variants; transition: Transition } {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (config.respectsReducedMotion && prefersReducedMotion) {
    return {
      variants: config.fallback || {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      },
      transition: { duration: 0.01 },
    };
  }

  const transition: Transition = {
    duration:
      parseFloat(
        designTokens.animation.duration[config.duration].replace("ms", ""),
      ) / 1000,
    ease: designTokens.animation.easing[config.easing],
    delay: config.delay || 0,
  };

  if (config.spring) {
    const springConfig = designTokens.animation.spring[config.spring];
    transition.type = "spring";
    transition.stiffness = springConfig.tension;
    transition.damping = springConfig.friction;
  }

  return { variants: baseVariants, transition };
}

// Animation orchestration utilities
export class AnimationOrchestrator {
  private activeAnimations = new Set<string>();
  private animationQueue: Array<() => Promise<void>> = [];
  private isProcessing = false;

  async startAnimation(
    id: string,
    animationFn: () => Promise<void>,
  ): Promise<void> {
    this.activeAnimations.add(id);
    this.animationQueue.push(async () => {
      try {
        await animationFn();
      } finally {
        this.activeAnimations.delete(id);
      }
    });

    if (!this.isProcessing) {
      await this.processQueue();
    }
  }

  private async processQueue(): Promise<void> {
    this.isProcessing = true;

    while (this.animationQueue.length > 0) {
      const animation = this.animationQueue.shift();
      if (animation) {
        await animation();
      }
    }

    this.isProcessing = false;
  }

  isAnimating(id?: string): boolean {
    return id ? this.activeAnimations.has(id) : this.activeAnimations.size > 0;
  }

  cancelAnimation(id: string): void {
    this.activeAnimations.delete(id);
  }

  cancelAllAnimations(): void {
    this.activeAnimations.clear();
    this.animationQueue.length = 0;
    this.isProcessing = false;
  }
}

// Singleton instance
export const animationOrchestrator = new AnimationOrchestrator();

// Performance monitoring for animations
export function measureAnimationPerformance<T extends (...args: any[]) => any>(
  animationFn: T,
  name: string,
): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    performance.mark(`animation-${name}-start`);
    const result = animationFn(...args);

    if (result instanceof Promise) {
      return result.finally(() => {
        performance.mark(`animation-${name}-end`);
        performance.measure(
          `animation-${name}`,
          `animation-${name}-start`,
          `animation-${name}-end`,
        );
      }) as ReturnType<T>;
    } else {
      performance.mark(`animation-${name}-end`);
      performance.measure(
        `animation-${name}`,
        `animation-${name}-start`,
        `animation-${name}-end`,
      );
      return result;
    }
  }) as T;
}

// Animation documentation and usage patterns
export const animationDocumentation = {
  pageTransitions: {
    description: "Use pageEnter/pageSlide for route changes",
    usage: "Apply to main content containers during navigation",
    performance: "Optimized for 60fps, respects reduced motion",
  },
  microInteractions: {
    description: "buttonHover, cardHover for interactive elements",
    usage: "Apply to clickable components for feedback",
    accessibility: "Automatically disabled for reduced motion users",
  },
  loadingStates: {
    description: "skeleton, spinner for async operations",
    usage: "Show during data fetching or processing",
    duration: "Infinite until loading completes",
  },
  staggerAnimations: {
    description: "staggerContainer/staggerItem for list animations",
    usage: "Apply to parent/child components respectively",
    timing: "0.1s delay between items by default",
  },
} as const;
