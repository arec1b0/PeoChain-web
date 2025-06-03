import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, BookOpen } from "lucide-react";

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
    <div className="hidden md:flex items-center space-x-1">
      {navItems.map((item) => {
        const Icon = item.icon || "div";
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              location.startsWith(item.href)
                ? "text-foreground bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
            aria-current={location.startsWith(item.href) ? "page" : undefined}
            onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, item.href)}
          >
            <div className="flex items-center">
              {item.icon && <Icon className="mr-2 h-4 w-4" />}
              {item.label}
            </div>
          </Link>
        );
      })}
      <Button
        variant="outline"
        size="sm"
        className="ml-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => window.open("/validator-bonds", "_blank")}
      >
        To Bonds
        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
      </Button>
    </div>
  );
};
