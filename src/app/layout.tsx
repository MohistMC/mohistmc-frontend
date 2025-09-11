import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import Header from "@/components/Header";
import {Providers} from "@/utils/themeMode";
import {GlobalProvider} from "@/context/store";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import {ToastContainer} from "react-toastify";

export const metadata: Metadata = {
  title: "MohistMC",
  description: 'Explore Minecraft innovation with MohistMC. Discover our hybrid server software, mods, plugins, and vibrant community. Unleash a new dimension of gameplay.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en_US" suppressHydrationWarning>
        <body>
        <Providers>
            <GlobalProvider>
                <Header/>
                {children}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </GlobalProvider>
            <ScrollToTop/>
        </Providers>
        <Footer/>
        </body>
        </html>
    );
}
