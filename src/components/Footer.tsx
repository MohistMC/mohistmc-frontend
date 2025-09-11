import Link from 'next/link'
import Image from 'next/image'
import { FaGithub, FaDiscord, FaTwitter } from 'react-icons/fa'

export default function Footer() {

    return (
        <footer className="bg-base-100 text-base-content pt-15">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-8 md:mb-0">
                        <Link href="/" className="flex items-center">
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <Image
                                        src="/img/mohistLogo.webp"
                                        alt="MohistMC Logo"
                                        width={32}
                                        height={32}
                                    />
                                </div>
                            </div>
                            <span className="self-center text-2xl font-semibold whitespace-nowrap ml-3">
                                MohistMC
                            </span>
                        </Link>
                        <Link
                            href={`mailto:mohistmc@gmail.com`}
                            className="block text-base-content/70 mt-3 text-sm hover:text-primary"
                        >
                            mohistmc@gmail.com
                        </Link>
                        <p className="text-base-content/70 text-xs max-w-sm pt-1">
                            For business or cooperation, please contact this email
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 sm:gap-6 md:grid-cols-3">
                        <div>
                            <h2 className="mb-3 text-xs font-semibold text-base-content uppercase">
                                Getting Started
                            </h2>
                            <ul className="space-y-1.5">
                                <li>
                                    <Link
                                        href="/docs/mohist"
                                        className="text-base-content/70 hover:text-primary transition-colors text-xs"
                                    >
                                        Documentation
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/tools"
                                        className="text-base-content/70 hover:text-primary transition-colors text-xs"
                                    >
                                        Tools
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-3 text-xs font-semibold text-base-content uppercase">
                                About
                            </h2>
                            <ul className="space-y-1.5">
                                <li>
                                    <Link
                                        href="/sponsor"
                                        className="text-base-content/70 hover:text-primary transition-colors text-xs"
                                    >
                                        Sponsor
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/team"
                                        className="text-base-content/70 hover:text-primary transition-colors text-xs"
                                    >
                                        Team
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-3 text-xs font-semibold text-base-content uppercase">
                                Community
                            </h2>
                            <ul className="space-y-1.5">
                                <li>
                                    <Link
                                        href="https://discord.gg/mohistmc"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-base-content/70 hover:text-primary transition-colors text-xs"
                                    >
                                        Discord
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://github.com/MohistMC"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-base-content/70 hover:text-primary transition-colors text-xs"
                                    >
                                        GitHub
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-base-300 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-xs text-base-content/70 sm:text-center">
                        {`MohistMC Copyright © 2019-${new Date().getFullYear()}`}
                    </span>
                    <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                        <Link
                            href="https://twitter.com/mohistmc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base-content/70 hover:text-primary transition-colors"
                            aria-label="Twitter"
                        >
                            <FaTwitter className="w-4 h-4" />
                        </Link>
                        <Link
                            href="https://github.com/MohistMC/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base-content/70 hover:text-primary transition-colors"
                            aria-label="GitHub"
                        >
                            <FaGithub className="w-4 h-4" />
                        </Link>
                        <Link
                            href="https://discord.gg/mohistmc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base-content/70 hover:text-primary transition-colors"
                            aria-label="Discord"
                        >
                            <FaDiscord className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}