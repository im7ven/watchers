import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryClientProvider from "./QueryClientProvider";
import AuthProvider from "./auth/Provider";
import Navbar from "./components/Navbar";
import { SearchContextProvider } from "./contexts/SearchContext";
import { ToastContextProvider } from "./contexts/ToastContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Watchers",
  description:
    "A mobile-friendly movie app that allows users to explore, review, and save their favorite films and series, featuring detailed information on ratings, casts, and more",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme appearance="dark" accentColor="amber" grayColor="sage">
              <ToastContextProvider>
                <Container maxWidth="1000px">
                  <SearchContextProvider>
                    <Navbar />
                    {children}
                  </SearchContextProvider>
                </Container>
              </ToastContextProvider>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
