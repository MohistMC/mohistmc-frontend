import {Poppins} from "next/font/google";
import {AppProps} from "next/app";
import "../app/globals.scss";
import '../app/nextra-custom.scss'
import 'flowbite-react'
import 'flowbite'
import React, {useEffect} from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {Provider} from "react-redux";
import {wrapper} from "@/util/redux/Store";
import {hackNextra} from "@/util/Nextra";

const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
})

export default function App({Component, pageProps}: AppProps) {
    const {store, props} = wrapper.useWrappedStore(pageProps)

    useEffect(() => {
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
            document.documentElement.classList.add('dark');
        else
            document.documentElement.classList.remove('dark')

        // Hack the Nextra docs appearance
        if (window.location.pathname.startsWith('/docs') || window.location.pathname.startsWith('/blog'))
            hackNextra()
    })

    return (
        <>
            <Head>
                <title>MohistMC</title>
            </Head>
            <style jsx global>{`
              html {
                font-family: ${poppins.style.fontFamily};
              }
            `}</style>
            <Provider store={store}>
                <Header/>
                <Component {...pageProps} />
                <Footer/>
            </Provider>
        </>
    );
}

