import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - HERO.AI",
    absolute: "HERO.AI - Military Experience Translator",
  },
  description:
    "HERO.AI uses advanced artificial intelligence to transform your military and first responder experience into powerful civilian resumes that leading companies understand and value.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} min-h-screen bg-[#0a0c1b] text-white antialiased`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
