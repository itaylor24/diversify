import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import FileUpload from "./fileupload.jsx";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

function AuthProvider({ children }: { children: React.ReactNode }) {

  return (
    <ClerkProvider>
      <ChakraProvider>
      <ColorModeScript initialColorMode={'dark'} />
      <div className="page">
        <div className="side-menu">
          <button className="sidebar-button">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </button>
          {/* <label htmlFor="file-upload" className="sidebar-button">
            Upload Data
          </label>
          <input type="file" id="file-upload"/> */}
          {/* <button className="sidebar-button"> Connect to gmail</button> */}
          {/* <a href="/example">
            <button className="sidebar-button"> Add example</button>
          </a> */}
          <FileUpload />
          <a href="/">
            <button className="sidebar-button">Home</button>
          </a>
        </div>
        {children}
      </div>
      </ChakraProvider>
    </ClerkProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <AuthProvider>{children}</AuthProvider>
         
      </body>
    </html>
  );
}
