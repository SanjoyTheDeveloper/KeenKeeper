import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KeenKeeper — Keep Your Friendships Alive",
  description: "KeenKeeper is a web app designed to help you maintain and strengthen your friendships by providing a simple and effective way to track your interactions and stay connected with your friends.  With KeenKeeper, you can easily log your interactions with friends, set reminders for future interactions, and view insights about your friendships to ensure that you never lose touch with the people who matter most to you. Whether you're looking to rekindle old friendships or simply want to stay on top of your social connections, KeenKeeper is the perfect tool to help you keep your friendships alive and thriving. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
