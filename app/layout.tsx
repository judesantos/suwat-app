import ThemeProvider from "@/components/theme-provider";
import "../styles/globals.css";
import { Metadata, Viewport } from "next";
import { Inter as FontSans } from 'next/font/google';
import { cn } from "@/lib/utils"
 
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Liftoff - AI-Powered Mock Interviews",
  openGraph: {
    title: "Liftoff - AI-Powered Mock Interviews",
    description:
      "Liftoff is an AI-powered mock interview platform that helps you practice for your next job interview.",
    images: [
      {
        url: "https://demo.useliftoff.com/opengraph-image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liftoff - AI-Powered Mock Interviews",
    description:
      "Liftoff is an AI-powered mock interview platform that helps you practice for your next job interview.",
    images: ["https://demo.useliftoff.com/opengraph-image"],
    creator: "@tmeyer_me",
  },
  metadataBase: new URL("https://demo.useliftoff.com"),
};

const viewport: Viewport = {
  themeColor: "#FFF",
}
export { viewport }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={cn(
        "scroll-smooth antialiased [font-feature-settings:'ss01']",
        fontSans.variable
      )}>
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
