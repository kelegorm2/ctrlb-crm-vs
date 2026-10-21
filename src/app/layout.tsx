import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project starter",
  description: "A Next.js starter with Better Auth, Prisma, and MySQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

