import { useAppSelector } from '@/util/redux/Hooks'
import { selectTranslations } from '@/features/i18n/TranslatorSlice'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { getAPIEndpoint } from '@/util/Environment'

export default function StatisticsElement() {
    const strings = useAppSelector(selectTranslations)

    const { ref, inView, entry } = useInView({
        threshold: 0,
    })

    const [resolvedBugs, setResolvedBugs] = useState(0)
    const [openedIssues, setOpenedIssues] = useState(0)
    const [players, setPlayers] = useState(0)
    const [servers, setServers] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${getAPIEndpoint()}/stats/all`)
            const data: {
                bstats: {
                    servers: {
                        maximum: number
                        current: number
                    }
                    players: {
                        maximum: number
                        current: number
                    }
                }
                github: {
                    open_issues_count: number
                    closed_issues_count: number
                }
                downloads: number
            } = await response.json()

            if (data?.bstats && data?.github) {
                animateCounter(data.github.closed_issues_count, setResolvedBugs)
                animateCounter(data.github.open_issues_count, setOpenedIssues)
                animateCounter(data.bstats.players.current, setPlayers)
                animateCounter(data.bstats.servers.current, setServers)
            }
        }

        fetchData().catch(console.error)
    }, [inView])

    const animateCounter = (targetValue: number, setter: Function) => {
        const increment = Math.ceil(targetValue / 100)
        let currentValue = 0

        const timer = setInterval(() => {
            currentValue += increment
            setter(Math.min(currentValue, targetValue))

            if (currentValue >= targetValue) {
                clearInterval(timer)
            }
        }, 10)
    }

    return (
        <section className="pb-20 bg-white dark:bg-dark-50 pt-10 flex flex-col justify-center items-center">
            <h2 className="text-center mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
                {strings['index.stats.title']}
            </h2>
            <dl
                ref={ref}
                className="bg-gray-100 mr-5 ml-5 py-10 md:mr-0 md:ml-0 grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-2 xl:grid-cols-4 dark:bg-dark-25 rounded-xl dark:text-white sm:p-8"
            >
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">
                        {resolvedBugs}
                    </dt>
                    <dd className="text-gray-500 text-center dark:text-gray-400">
                        {strings['index.stats.resolvedbugs']}
                    </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">
                        {openedIssues}
                    </dt>
                    <dd className="text-gray-500 text-center dark:text-gray-400">
                        {strings['index.stats.openedissues']}
                    </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">{players}+</dt>
                    <dd className="text-gray-500 text-center dark:text-gray-400">
                        {strings['index.stats.players']}
                    </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">{servers}+</dt>
                    <dd className="text-gray-500 text-center dark:text-gray-400">
                        {strings['index.stats.servers']}
                    </dd>
                </div>
            </dl>
        </section>
    )
}
