import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Sidebar from "@/app/Components/Botton/Sidebar/sidebar"
import GlobalStyleProvider from "@/app/providers/GlobalStylesProvider";
import ContextProvider from "@/app/providers/ContextProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import NextTopLoader from "nextjs-toploader";

const nunito = Nunito({ 
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { userId } = auth(); // Fetching userId on the server side

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
            integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className={nunito.className}>
          <NextTopLoader
          height={2}
          color="#27AE60"
          easing="cubic-bezier(0.53,0.21,0,1)"
          showSpinner={false}
          />
          <ContextProvider>
            <GlobalStyleProvider>
              {userId && <Sidebar/>}
              <div className="w-full">{children}</div>
            </GlobalStyleProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}