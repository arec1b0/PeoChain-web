import React from "react";
import { Link, useLocation } from "wouter";

// Using a placeholder for the logo - replace with your actual logo import
const BrandmarkLogo = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(
  (
    props: React.ImgHTMLAttributes<HTMLImageElement>,
    ref: React.Ref<HTMLImageElement>,
  ) => (
    <img
      ref={ref}
      src="/logo.svg"
      alt="PeoChain Logo"
      width={32}
      height={32}
      loading="eager"
      {...props}
    />
  ),
);
BrandmarkLogo.displayName = "BrandmarkLogo";

interface NavigationLogoProps {
  onNavigateHome: (e?: React.KeyboardEvent | React.MouseEvent) => void;
}

export const NavigationLogo: React.FC<NavigationLogoProps> = ({ onNavigateHome }) => {
  const [location] = useLocation();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onNavigateHome(event);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Link
        href="/"
        className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md p-1 -ml-1"
        aria-label="Go to homepage"
        aria-current={location === "/" ? "page" : undefined}
        onClick={onNavigateHome}
        onKeyDown={handleKeyDown}
      >
        <BrandmarkLogo className="h-8 w-auto" />
        <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          PeoChain
        </span>
      </Link>
    </div>
  );
};