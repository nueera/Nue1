import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AccentSync } from "@/components/nueone/AccentSync";
import { KeyboardShortcutProvider } from "@/components/global/KeyboardShortcutProvider";
import { GlobalLoadingProvider } from "@/components/global/GlobalLoadingProvider";
import { NotificationDrawer, NotificationToast, CrossModuleSearch } from "@/components/global";
import { GlobalWorkspaceDock } from "@/components/workspace/GlobalWorkspaceDock";
import { QueryProvider } from "@/components/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NueOne — Business OS",
  description: "The next-generation SaaS OS — your control center for all business modules.",
  keywords: ["NueOne", "Business OS", "SaaS", "ERP", "CRM", "Dashboard"],
  authors: [{ name: "NueOne" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <QueryProvider>
            <AccentSync />
            <KeyboardShortcutProvider>
              <GlobalLoadingProvider>
                {children}
                <CrossModuleSearch />
                <GlobalWorkspaceDock />
                <Toaster />
                <NotificationDrawer />
                <NotificationToast />
              </GlobalLoadingProvider>
            </KeyboardShortcutProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
