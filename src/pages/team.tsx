import TeamCard from "@/components/Team/TeamCard";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {useAppSelector} from "@/util/redux/Hooks";
import {getLocaleStringAsArgs} from "@/util/LocaleHelper";
import MOHISTMC_TEAM from "@/util/content/Team";

export default function Team() {
    const strings = useAppSelector(selectTranslations);

    return (
        <section className="flex flex-col justify-center items-center pt-20 bg-white dark:bg-dark-50">
            <h1 className="md:mt-20 text-center w-3/4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{getLocaleStringAsArgs(strings['team.title'])[0]} <span className="text-blue-600 dark:text-blue-500">{getLocaleStringAsArgs(strings['team.title'])[1]}</span>{getLocaleStringAsArgs(strings['team.title'])[2]}</h1>

            <div className={`flex flex-wrap md:w-full justify-center pt-12 pb-12 gap-7`}>
                {
                    Object.values(MOHISTMC_TEAM).map((teamMember) => <TeamCard name={teamMember.name} role={teamMember.role} pageUrl={teamMember.pageUrl}/>)
                }
            </div>
        </section>
    )
}