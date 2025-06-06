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
    <div className="hidden md:flex items-center space-x-3">
      {navItems.map((item) => {
        const Icon = item.icon || "div";
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`px-5 py-3 rounded-lg text-lg font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:scale-105 ${
              location.startsWith(item.href)
                ? "text-white bg-medium-forest shadow-lg"
                : "text-foreground hover:text-medium-forest hover:bg-sage/10 hover:shadow-md"
            }`}
            aria-current={location.startsWith(item.href) ? "page" : undefined}
            onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, item.href)}
          >
            <div className="flex items-center">
              {item.icon && <Icon className="mr-2 h-5 w-5" />}
              {item.label}
            </div>
          </Link>
        );
      })}
      <Button
        variant="primary"
        size="lg"
        className="ml-4 px-6 py-3 text-lg font-bold bg-gradient-to-r from-sage to-medium-forest hover:from-medium-forest hover:to-dark-sage text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => window.open(EXTERNAL_URLS.VALIDATOR_APPLICATION, "_blank")}
      >
        Validator Bonds
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};
