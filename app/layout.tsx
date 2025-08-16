import type { Metadata } from "next";

import "./globals.css";



export const metadata: Metadata = {
  title: "SwiftSend",
  description: "Send text quickly without login.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-background-primary '>
        <div className='container mx-auto border-x'>

          {children}
        </div>
      </body>
    </html>
  );
}
