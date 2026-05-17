import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Innovyra | Smart Career Execution Engine",
  description:
    "Smart Career Execution Engine. An AI operating system that converts career goals into executable workflows."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
