import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider,SignedIn,SignedOut,SignInButton, UserButton } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/modal-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dimploma-app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={cn(
          font.className, 
          "bg-white dark:bg-[#313338]")}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            
          </SignedIn>
          <ThemeProvider 
          attribute="class" 
          defaultTheme="dark"
          enableSystem={false}
          storageKey="diploma-app-theme">
            <ModalProvider/>
            {children}
          </ThemeProvider>
        </body>
      </html>
  </ClerkProvider>
  );
}
