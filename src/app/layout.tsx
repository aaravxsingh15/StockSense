import type { Metadata } from "next";
import "./globals.css";
import "./interactive.css";
import "./fixes.css";

export const metadata: Metadata = { title: "StockSense", description: "Demand intelligence and inventory optimization" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
