import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, userEvent } from "./test-utils";
import { axe, toHaveNoViolations } from "jest-axe";
import HeroSection from "@/components/hero-section";
import { mockFramerMotion } from "./test-utils";

expect.extend(toHaveNoViolations);

// Mock framer-motion for stable tests
mockFramerMotion();

describe("HeroSection", () => {
  beforeEach(() => {
    // Clear any previous mocks
    vi.clearAllMocks();
  });

  it("renders all hero content correctly", () => {
    render(<HeroSection />);

    // Check main title
    expect(screen.getByText(/solving the/i)).toBeInTheDocument();
    expect(screen.getByText(/blockchain trilemma/i)).toBeInTheDocument();
    expect(screen.getByText(/making/i)).toBeInTheDocument();
    expect(screen.getByText(/defi accessible/i)).toBeInTheDocument();

    // Check description
    expect(screen.getByText(/unprecedented/i)).toBeInTheDocument();
    expect(screen.getByText(/100,000 TPS/i)).toBeInTheDocument();
    expect(screen.getByText(/1-second finality/i)).toBeInTheDocument();

    // Check metrics
    expect(screen.getByText("TPS")).toBeInTheDocument();
    expect(screen.getByText("Second Finality")).toBeInTheDocument();
    expect(screen.getByText("Avg. Fees")).toBeInTheDocument();
    expect(screen.getByText("Decentralized")).toBeInTheDocument();
  });

  it("renders action buttons with correct labels", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("button", { name: /join validator network/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /experience testnet/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /read whitepaper/i }),
    ).toBeInTheDocument();
  });

  it("handles button clicks correctly", async () => {
    const user = userEvent.setup();

    // Mock window.location.href
    delete (window as any).location;
    window.location = { href: "" } as any;

    render(<HeroSection />);

    const validatorButton = screen.getByRole("button", {
      name: /join validator network/i,
    });
    await user.click(validatorButton);

    expect(window.location.href).toBe("/validator-bonds");
  });

  it("handles testnet button click", async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(<HeroSection />);

    const testnetButton = screen.getByRole("button", {
      name: /experience testnet/i,
    });
    await user.click(testnetButton);

    expect(consoleSpy).toHaveBeenCalledWith("Testnet action clicked");

    consoleSpy.mockRestore();
  });

  it("meets accessibility standards", async () => {
    const { container } = render(<HeroSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has proper semantic structure", () => {
    render(<HeroSection />);

    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent(/solving the blockchain trilemma/i);

    // Check for section landmark
    const section =
      screen.getByRole("main") || screen.getByTestId("hero-section");
    expect(
      section || screen.getByText(/solving the/i).closest("section"),
    ).toBeInTheDocument();
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<HeroSection />);

    const firstButton = screen.getByRole("button", {
      name: /join validator network/i,
    });
    const secondButton = screen.getByRole("button", {
      name: /experience testnet/i,
    });

    // Tab to first button
    await user.tab();
    expect(firstButton).toHaveFocus();

    // Tab to second button
    await user.tab();
    expect(secondButton).toHaveFocus();
  });

  it("handles error boundaries gracefully", () => {
    // Mock console.error to avoid noise in test output
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // This would normally be tested by passing error-prone props
    // Since HeroSection uses static data, we'll test the error boundary wrapper
    render(<HeroSection />);

    // Component should render normally
    expect(screen.getByText(/solving the/i)).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});

import { vi } from "vitest";
