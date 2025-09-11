
"use client";

import React from 'react'
import {FaAlipay, FaPatreon, FaQq, FaWeixin} from 'react-icons/fa6'
import Image from 'next/image';
import {SiGithubsponsors} from 'react-icons/si'
import {BsOpencollective} from 'react-icons/bs'
import SponsorAvatar from "@/components/SponsorAvatar";
import Link from "next/link";
import TitleContainer from "@/components/TitleContainer";

export default function Sponsor(){

    const alipay = (
        <div className="w-64 text-sm">
            <Image height={1680} width={1080} alt="alipay" src="/img/alipay.webp"/>
        </div>
    )

    const qqpay = (
        <div className="w-64 text-sm">
            <Image height={1080} width={1080} alt="qqpay" src="/img/qqpay.webp"/>
        </div>
    )

    const wxpay = (
        <div className="w-64 text-sm">
            <Image height={1080} width={1080} alt="wxpay" src="/img/wx.webp"/>
        </div>
    )
    return (
        <section className="flex flex-col min-h-screen pt-10 sm:pt-20 bg-base-100 text-base-content">
            <div className="pt-2 px-4 mx-auto max-w-screen-xl text-center">
                <TitleContainer
                    titleKey="Supporting MohistMC's Minecraft Innovation Future"
                    subtitleKey="Help drive the development of the MohistMC community. Your support will cover necessary expenses including services, servers, and infrastructure. Contribute now to change the future of MohistMC."
                    fromColor="from-accent"
                    toColor="to-primary"
                />
                <h2 className="text-center mb-4 text-xl font-extrabold leading-none tracking-tight md:text-2xl lg:text-3xl">
                    Please Choose Your Sponsorship Method
                </h2>
                <div className="flex justify-center mt-4 mb-6">
                    <Link
                        href="https://www.patreon.com/c/mohistmc"
                        target="_blank"
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg border border-base-300 focus:ring-4 focus:ring-base-200 bg-base-200 hover:bg-base-300"
                    >
                        <FaPatreon className="w-5 h-5"/>
                        <span className="ml-2"/>
                        Patreon
                    </Link>
                </div>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <Link
                        href="https://opencollective.com/mohist"
                        target="_blank"
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg border border-base-300 focus:ring-4 focus:ring-base-200 bg-base-200 hover:bg-base-300"
                    >
                        <BsOpencollective className="w-5 h-5"/>
                        <span className="ml-2"/>
                        OpenCollective
                    </Link>
                    <Link
                        href="https://github.com/sponsors/MohistMC"
                        target="_blank"
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg border border-base-300 focus:ring-4 bg-base-200 hover:bg-base-300"
                    >
                        <SiGithubsponsors className="w-5 h-5"/>
                        <span className="ml-2"/>
                        GitHub Sponsors
                    </Link>
                    <div className="dropdown dropdown-top dropdown-end">
                        <label tabIndex={0} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg border border-base-300 focus:ring-4 bg-base-200 hover:bg-base-300 cursor-pointer w-full sm:w-auto">
                            <FaAlipay className="w-5 h-5"/>
                            <span className="ml-2"/>
                            Alipay
                        </label>
                        <div tabIndex={0} className="dropdown-content z-[1]">
                            {alipay}
                        </div>
                    </div>
                    <div className="dropdown dropdown-top dropdown-end">
                        <label tabIndex={0} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg border border-base-300 focus:ring-4 bg-base-200 hover:bg-base-300 cursor-pointer w-full sm:w-auto">
                            <FaQq className="w-5 h-5"/>
                            <span className="ml-2"/>
                            QQ Pay
                        </label>
                        <div tabIndex={0} className="dropdown-content z-[1]">
                            {qqpay}
                        </div>
                    </div>
                    <div className="dropdown dropdown-top dropdown-end">
                        <label tabIndex={0} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg border border-base-300 focus:ring-4 bg-base-200 hover:bg-base-300 cursor-pointer w-full sm:w-auto">
                            <FaWeixin className="w-5 h-5"/>
                            <span className="ml-2"/>
                            WeChat Pay
                        </label>
                        <div tabIndex={0} className="dropdown-content z-[1]">
                            {wxpay}
                        </div>
                    </div>
                    <Link
                        href="https://ifdian.net/a/MohistMC"
                        target="_blank"
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg border border-base-300 focus:ring-4 focus:ring-base-200 bg-base-200 hover:bg-base-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#8a2be2" d="M9 14.234a.567.567 0 1 0 0 1.134a.567.567 0 0 0 0-1.134m5.351 1.705a.567.567 0 1 0 0 1.135a.567.567 0 0 0 0-1.135m8.401 1.436c-.189.095-.461.1-.713.013c-.169-.06-.352-.116-.534-.172c-.339-.104-.904-.276-1.011-.407a.533.533 0 1 0-.853.643c.059.08.139.146.22.209c-.816 1.131-4.398 3.382-9.464 2.273c-2.283-.5-3.819-1.413-4.444-2.639c-.451-.885-.348-1.797-.133-2.293c.62-1.29 5.097-4.261 7.955-5.943a.537.537 0 0 0 .188-.733c-.149-.254-.49-.356-.73-.189c-.231.135-1.015.601-2.015 1.236c-.338-.227-.923-.508-1.86-.6c-1.486-.148-4.92-.805-6.029-1.275C2.535 7.162.731 6.27 1.131 5.267c.092-.234.527-.613 1.47-.974a8.5 8.5 0 0 1 1.995-.492l-.212.103c-.642.312-1.343.662-1.813 1.075c-.034-.022-.07-.044-.094-.069a.527.527 0 0 0-.754-.017a.533.533 0 0 0-.017.756c.19.2.471.35.829.465l.039.014c1.245.383 3.458.336 6.578.211c1.345-.052 2.615-.102 3.674-.082c3.512.07 6.152 1.469 8.07 4.279c1.178 1.725.753 3.426.079 4.903a1.4 1.4 0 0 1-.231-.222a.54.54 0 0 0-.75-.085a.535.535 0 0 0-.086.751c.109.137.665.778 1.355.724l.037-.002c.021-.003.042.001.064-.003c.472-.086.768-.063 1.045.111c.367.232.547.37.511.485c-.021.073-.076.125-.168.177M8.19 11.418l-.315.231a1.6 1.6 0 0 1-.243-.32c.123-.038.33.007.558.089m14.733 4.356a1.9 1.9 0 0 0-.81-.27c.632-1.544 1.034-3.565-.336-5.572c-2.096-3.072-5.101-4.668-8.93-4.744c-1.091-.022-2.377.029-3.737.083c-1.58.063-3.683.145-5.112.027c.285-.155.588-.304.851-.431c1.006-.49 1.797-.872 1.535-1.548c-.137-.396-.547-.603-1.219-.618C3.748 2.669.688 3.489.138 4.872c-.31.779-.361 2.282 2.775 3.61c1.29.548 4.934 1.216 6.341 1.355c.397.039.701.119.931.205a75 75 0 0 0-.986.664c-.577-.329-1.521-.718-2.226-.237a.94.94 0 0 0-.435.768c-.01.385.224.763.486 1.066c-1.038.83-1.877 1.634-2.175 2.253c-.332.762-.467 2.008.153 3.224c.786 1.544 2.524 2.62 5.166 3.199c3.454.755 6.437.075 8.411-.966c1.099-.579 1.878-1.27 2.257-1.887l.356.113c.169.051.338.103.496.159c.522.181 1.1.157 1.545-.068l.025-.013c.336-.177.577-.46.683-.803c.285-.922-.528-1.432-1.018-1.74"/>
                        </svg>
                        <span className="ml-2"/>
                        Ifdian
                    </Link>
                </div>
            </div>
            <div className="pt-10 md:pb-0 pb-6 px-4 mx-auto max-w-screen-xl text-center">
                <h2 className="text-center mb-4 text-xl font-extrabold leading-none tracking-tight md:text-2xl lg:text-3xl">
                    Our Sponsors
                </h2>
            </div>
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <SponsorAvatar />
                </div>
            </main>
        </section>
    )
}