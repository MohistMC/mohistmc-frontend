import { Poppins } from 'next/font/google'
import { AppProps } from 'next/app'
import '../app/globals.scss'
import '../app/nextra-custom.scss'
import 'flowbite-react'
import 'flowbite'
import React, { useEffect } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import FooterComponent from '@/components/Footer'
import { Provider } from 'react-redux'
import { wrapper } from '@/util/redux/Store'
import { hackNextra } from '@/util/Nextra'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ToastLogger } from '@/util/Logger'
import { getAPIEndpoint, isDevEnv } from '@/util/Environment'
import { loginUserAsync } from '@/features/user/UserSlice'
import { EnvironmentLayout } from '@/components/EnvironmentLayout'

const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(pageProps)

    useEffect(() => {
        if (
            localStorage.getItem('color-theme') === 'dark' ||
            (!('color-theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        )
            document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')

        // Hack the Nextra docs appearance
        if (
            window.location.pathname.startsWith('/docs') ||
            window.location.pathname.startsWith('/blog')
        )
            hackNextra()
    })

    useEffect(() => {
        document.documentElement.lang = 'en'

        if (isDevEnv) {
            ToastLogger.info('You are running MohistMC in development mode.')

            fetch(`${getAPIEndpoint()}/health`)
                .then((res) => {
                    if (res.status === 200)
                        ToastLogger.info('The backend server is running')
                    else
                        ToastLogger.error(
                            'The backend server is not responding. If you plan on working with it, make sure to start it. If the port has been changed (default is 2024), make sure to change it in the src/util/Environment.ts file.',
                            30000,
                        )
                })
                .catch(() => {
                    ToastLogger.error(
                        'The backend server is not responding. If you plan on working with it, make sure to start it. If the port has been changed (default is 2024), make sure to change it in the src/util/Environment.ts file.',
                        30000,
                    )
                })
        }

        loginUserAsync().catch()
    }, [])

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
                <ToastContainer />
                <EnvironmentLayout />
                <Header />
                <Component {...pageProps} />
                <FooterComponent />
            </Provider>
        </>
    )
}
