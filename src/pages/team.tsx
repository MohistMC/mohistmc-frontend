import TeamCard from "@/components/Team/TeamCard";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {useAppSelector} from "@/util/redux/Hooks";
import {getLocaleStringAsArgs} from "@/util/LocaleHelper";
import MOHISTMC_TEAM from "@/util/content/Team";
import Head from "next/head";
import {getCopyrightText} from "@/util/String";

export default function Team() {
    const strings = useAppSelector(selectTranslations);

    return (
        <section className="flex flex-col justify-center items-center pt-20 bg-white dark:bg-dark-50">
            <Head>
                <title>{strings['team.page.title']}</title>
                <meta name="title" content="MohistMC - Our team" />
                <meta name="description" content={`Meet Our Team! Discover the faces behind MohistMC's innovation. ${getCopyrightText()} MohistMC.`} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://new.mohistmc.com/team" />
                <meta property="og:title" content="MohistMC - Team" />
                <meta property="og:description" content={`Meet Our Team! Discover the faces behind MohistMC's innovation. ${getCopyrightText()} MohistMC.`} />
                <meta property="og:image" content="https://new.mohistmc.com/mohistLogo.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://new.mohistmc.com/team" />
                <meta property="twitter:title" content="MohistMC - Team" />
                <meta property="twitter:description" content={`Meet Our Team! Discover the faces behind MohistMC's innovation. ${getCopyrightText()} MohistMC.`} />
                <meta property="twitter:image" content="https://new.mohistmc.com/mohistLogo.png" />
            </Head>
            <h1 className="md:mt-20 text-center w-3/4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{getLocaleStringAsArgs(strings['team.title'])[0]} <span className="text-blue-600 dark:text-blue-500">{getLocaleStringAsArgs(strings['team.title'])[1]}</span>{getLocaleStringAsArgs(strings['team.title'])[2]}</h1>

            <div className={`flex flex-wrap md:w-full justify-center pt-12 pb-12 gap-7`}>
                {
                    Object.values(MOHISTMC_TEAM).map((teamMember) => <TeamCard key={teamMember.name} name={teamMember.name} role={teamMember.role} pageUrl={teamMember.pageUrl}/>)
                }
            </div>
        </section>
    )
}