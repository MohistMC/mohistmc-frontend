import { Card, Button } from 'flowbite-react'
import { useAppSelector } from '@/util/redux/Hooks'
import { selectTranslations, selectTranslationsByString } from '@/features/i18n/TranslatorSlice'

interface PricingCardProps {
    title: string
    vault: number
    bool1: boolean
    bool2: boolean
    bool3: boolean
    bool4: boolean
    bool5: boolean
    bool6: boolean
    bool7: boolean
}

export default function PricingCard({
    title,
    vault,
    bool1,
    bool2,
    bool3,
    bool4,
    bool5,
    bool6,
    bool7,
}: PricingCardProps) {
    const colorClass1 = bool1
        ? 'text-green-600 dark:text-green-500'
        : 'text-gray-400 dark:text-gray-500'
    const colorClass2 = bool2
        ? 'text-green-600 dark:text-green-500'
        : 'text-gray-400 dark:text-gray-500'
    const colorClass3 = bool3
        ? 'text-green-600 dark:text-green-500'
        : 'text-gray-400 dark:text-gray-500'
    const colorClass4 = bool4
        ? 'text-green-600 dark:text-green-500'
        : 'text-gray-400 dark:text-gray-500'
    const colorClass5 = bool5
        ? 'text-green-600 dark:text-green-500'
        : 'text-gray-400 dark:text-gray-500'
    const colorClass6 = bool6
        ? 'text-green-600 dark:text-green-500'
        : 'text-gray-400 dark:text-gray-500'
    const colorClass7 = bool7
        ? 'text-green-600 dark:text-green-500'
        : 'text-gray-400 dark:text-gray-500'

    const i18n = useAppSelector(selectTranslations)
    const i18nStirng = useAppSelector(selectTranslationsByString)

    return (
        <Card className="max-w-sm">
            <div style={{ display: 'grid', placeItems: 'center' }}>
                <img
                    className={`w-20 h-20`}
                    src={`../pricingcard/${title}.png`}
                    alt={`items name`}
                />
            </div>
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                {i18nStirng['subscription.items.' + title]}
            </h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
                <span className="text-3xl font-semibold">{i18n['vault.format.mohth']}</span>
                <span className="text-5xl font-extrabold tracking-tight">
                    {vault}
                </span>
                <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                    /{i18n['time.format.mohth']}
                </span>
            </div>
            <ul className="my-7 space-y-5">
                <li className="flex space-x-3">
                    <svg
                        className={`h-5 w-5 shrink-0 ${colorClass1}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                        {i18n['subscription.items.1']}
                    </span>
                </li>
                <li className="flex space-x-3">
                    <svg
                        className={`h-5 w-5 shrink-0 ${colorClass2}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                       {i18n['subscription.items.2']}
                    </span>
                </li>
                <li className="flex space-x-3">
                    <svg
                        className={`h-5 w-5 shrink-0 ${colorClass3}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                        {i18n['subscription.items.3']}
                    </span>
                </li>
                <li className="flex space-x-3 line-through decoration-gray-500">
                    <svg
                        className={`h-5 w-5 shrink-0 ${colorClass4}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500">
                        {i18n['subscription.items.4']}
                    </span>
                </li>
                <li className="flex space-x-3 line-through decoration-gray-500">
                    <svg
                        className={`h-5 w-5 shrink-0 ${colorClass5}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500">
                        {i18n['subscription.items.5']}
                    </span>
                </li>
                <li className="flex space-x-3 line-through decoration-gray-500">
                    <svg
                        className={`h-5 w-5 shrink-0 ${colorClass6}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500">
                         {i18n['subscription.items.6']}
                    </span>
                </li>
                <li className="flex space-x-3 line-through decoration-gray-500">
                    <svg
                        className={`h-5 w-5 shrink-0 ${colorClass7}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500">
                         {i18n['subscription.items.7']}
                    </span>
                </li>
                <li className="flex space-x-3 line-through decoration-gray-500">
                    <span className="text-base font-normal leading-tight text-gray-500">
                         -----------------------------------
                    </span>
                </li>
            </ul>
            <Button outline gradientDuoTone="purpleToPink">
                {' '}
                Choose plan{' '}
            </Button>
        </Card>
    )
}
