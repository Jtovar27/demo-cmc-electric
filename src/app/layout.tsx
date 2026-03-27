import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CMC Electric LLC",
  description: "Professional electrical training and services",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
