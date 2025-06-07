import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, BookOpen } from "lucide-react";
import { EXTERNAL_URLS } from "@shared/config";

interface NavItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  id: string;
}

const navItems: NavItem[] = [
  { href: "/technology", label: "Technology", icon: Zap, id: "technology" },
  {
    href: "/whitepaper",
    label: "Whitepaper",
    icon: BookOpen,
    id: "whitepaper",
  },
];

export const DesktopNavigation: React.FC = () => {
  const [location] = useLocation();

  const handleKeyDown = (e: React.KeyboardEvent, href: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <div className="hidden lg:flex items-center space-x-4">
      {navItems.map((item) => {
        const Icon = item.icon || "div";
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`touch-target px-5 py-4 rounded-lg text-lg font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-dashed focus-visible:outline-2 ${
              location.startsWith(item.href)
                ? "text-white bg-dark-forest shadow-md" 
                : "text-gray-900 dark:text-gray-100 hover:text-dark-forest hover:bg-sage/20 hover:shadow-sm"
            }`}
            aria-current={location.startsWith(item.href) ? "page" : undefined}
            onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, item.href)}
          >
            <div className="flex items-center">
              {item.icon && <Icon className="mr-2.5 h-5 w-5" aria-hidden="true" />}
              {item.label}
            </div>
          </Link>
        );
      })}
      <Button
        variant="primary"
        size="lg"
        className="ml-4 px-6 py-4 min-h-[44px] min-w-[44px] text-lg font-bold bg-dark-forest text-white hover:bg-forest-900 shadow-md hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => window.open(EXTERNAL_URLS.VALIDATOR_APPLICATION, "_blank")}
      >
        Validator Bonds
        <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
      </Button>
    </div>
  );
};
