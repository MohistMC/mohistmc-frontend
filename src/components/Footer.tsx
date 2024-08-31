import Link from 'next/link'
import { useAppSelector } from '@/util/redux/Hooks'
import { selectTranslations } from '@/features/i18n/TranslatorSlice'
import { getCopyrightText } from '@/util/String'
import Image from 'next/image'
import mohistLogo from '../../public/mohistLogo.webp'
import { FaGithub, FaDiscord, FaTwitter } from "react-icons/fa";

export default function Footer() {
    const strings = useAppSelector(selectTranslations)

    return (
        <footer className="bg-white dark:bg-dark-50">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-10 md:mb-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src={mohistLogo}
                                className="h-8 w-auto mr-3"
                                alt="MohistMC Logo"
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-dark-50 dark:text-white">
                                MohistMC
                            </span>
                        </Link>
                        <Link
                            href={`mailto:mohistmc@gmail.com`}
                            className="block text-gray-600 mt-4 text-sm dark:text-gray-400 md:hover:text-blue-500"
                        >
                            mohistmc@gmail.com
                        </Link>
                        <p
                            className={`dark:text-gray-400 text-gray-600 text-sm max-w-sm pt-1`}
                        >
                            Do not send your bugs to this email, please use our
                            issue tracker{' '}
                            <Link
                                href="https://github.com/MohistMC/Mohist/issues"
                                className="dark:text-blue-500 text-blue-700"
                            >
                                for Mohist
                            </Link>{' '}
                            or{' '}
                            <Link
                                href="https://github.com/MohistMC/Banner/issues"
                                className="dark:text-blue-500 text-blue-700"
                            >
                                for Banner
                            </Link>{' '}
                            instead.
                        </p>
                    </div>
                    <div className="flex gap-12 flex-wrap">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                {strings['footer.heading.gettingstarted']}
                            </h2>
                            <ul className="text-gray-600 dark:text-gray-400 font-medium">
                                <li>
                                    <Link
                                        href="/downloads"
                                        className="md:hover:text-blue-500"
                                    >
                                        {strings['button.downloads']}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contribute"
                                        className="md:hover:text-blue-500"
                                    >
                                        {strings['button.contribute']}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/docs"
                                        className="md:hover:text-blue-500"
                                    >
                                        {strings['button.documentation']}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blog"
                                        className="md:hover:text-blue-500"
                                    >
                                        {strings['button.blog']}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                {strings['button.about']}
                            </h2>
                            <ul className="text-gray-600 dark:text-gray-400 font-medium">
                                <li>
                                    <Link
                                        href="#"
                                        className="md:hover:text-blue-500 "
                                    >
                                        {strings['footer.heading.discover']}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/sponsor"
                                        className="md:hover:text-blue-500"
                                    >
                                        {strings['button.sponsor']}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/team"
                                        className="md:hover:text-blue-500"
                                    >
                                        {strings['button.team']}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                {strings['footer.heading.community']}
                            </h2>
                            <ul className="text-gray-600 dark:text-gray-400 font-medium">
                                <li>
                                    <Link
                                        href="#"
                                        className="md:hover:text-blue-500"
                                    >
                                        {strings['button.community']}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://discord.gg/mohistmc"
                                        className="md:hover:text-blue-500"
                                    >
                                        {strings['social.discord']}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://github.com/MohistMC"
                                        className="md:hover:text-blue-500"
                                    >
                                        {strings['social.github']}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="md:hover:text-blue-500"
                                    >
                                        {strings['social.forum']}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        {getCopyrightText()}{' '}
                        <Link
                            href="/"
                            className="hover:underline md:dark:hover:text-gray-500"
                        >
                            MohistMC
                        </Link>
                    </span>
                    <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                        <Link
                            href="https://twitter.com/mohistmc"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        >
                            <FaTwitter  className="w-5 h-5"/>
                            <span className="sr-only">Twitter page</span>
                        </Link>
                        <Link
                            href="https://github.com/MohistMC/"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        >
                            <FaGithub  className="w-5 h-5"/>
                            <span className="sr-only">GitHub account</span>
                        </Link>
                        <Link
                            href="https://discord.gg/mohistmc"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        >
                            <FaDiscord  className="w-5 h-5"/>
                            <span className="sr-only">Discord</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
