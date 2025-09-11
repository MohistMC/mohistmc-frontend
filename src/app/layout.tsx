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
  title: "墨孤蓝网络科技 - MohistMC",
  description: '使用 MohistMC 探索 Minecraft 创新。发现我们的混合服务器软件、模组、插件和充满活力的社区。释放新的游戏维度.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN" suppressHydrationWarning>
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
