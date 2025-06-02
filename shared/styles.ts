export const CARD_STYLES = {
  BASE: "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-sage/20 shadow-lg",
  GRADIENT: "bg-gradient-to-br from-sage to-medium-forest",
  HOVER: "hover:bg-sage/10 transition-colors",
  INTERACTIVE: "p-3 bg-sage/5 rounded-lg hover:bg-sage/10 transition-colors",
  BORDERED: "p-4 bg-sage/5 rounded-lg hover:bg-sage/10 transition-colors border border-sage/10"
} as const;

export const BUTTON_STYLES = {
  PRIMARY: "bg-sage hover:bg-medium-forest active:bg-dark-forest text-white font-raleway font-medium",
  SECONDARY: "border-2 border-sage text-sage hover:bg-sage hover:text-white active:bg-medium-forest",
  OUTLINE_WHITE: "border-white text-white hover:bg-white hover:text-sage",
  SIZE_LG: "px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg",
  ANIMATION: "transform transition-all duration-300 hover:scale-105 shadow-lg touch-action-manipulation active:scale-[0.98] active:shadow-md min-h-[56px] min-w-[120px] w-full sm:w-auto select-none tap-highlight-transparent"
} as const;

export const LAYOUT_STYLES = {
  SECTION: "py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8",
  CONTAINER: "max-w-6xl mx-auto",
  GRID_2: "grid md:grid-cols-2 gap-8",
  GRID_3: "grid md:grid-cols-3 gap-6",
  GRID_4: "grid md:grid-cols-2 lg:grid-cols-4 gap-8",
  FLEX_CENTER: "flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
} as const;

export const TEXT_STYLES = {
  HEADING_XL: "text-4xl sm:text-5xl lg:text-6xl font-raleway font-medium",
  HEADING_LG: "text-3xl font-raleway font-medium",
  HEADING_MD: "text-2xl font-raleway font-medium",
  BODY_LG: "text-lg sm:text-xl font-hammersmith",
  BODY_BASE: "font-hammersmith",
  FOREST: "text-forest dark:text-white",
  FOREST_MUTED: "text-forest/80 dark:text-gray-300",
  SAGE: "text-sage"
} as const;

export const ANIMATION_VARIANTS = {
  FADE_IN: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  },
  FADE_IN_UP: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  },
  STAGGER_CONTAINER: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }
} as const;