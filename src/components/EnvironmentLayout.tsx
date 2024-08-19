import { isDevEnv } from '@/util/Environment'

export const EnvironmentLayout = () => {
    if (!isDevEnv) return <></>

    return (
        <div className="fixed -left-10 bg-blue-700 text-white p-2 transform -rotate-45 origin-top-left z-50 mt-60 w-[25rem] opacity-80 text-center text-lg">
            Development
        </div>
    )
}
