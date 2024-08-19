import { LocaleState } from '@/features/i18n/TranslatorSlice'
import getLocaleIconSVG from '@/util/LocaleHelper'

interface LanguageDropElementProps {
    locale: LocaleState
}

export default function LanguageDropButtonElement({
    locale,
}: LanguageDropElementProps) {
    return (
        <button
            type="button"
            data-dropdown-toggle="language-dropdown-menu"
            data-dropdown-trigger="hover"
            aria-label="Toggle language dropdown menu"
            className="inline-flex items-center py-2 pl-3 pr-4 font-medium justify-center text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-dark-200 dark:hover:text-white"
        >
            {getLocaleIconSVG(locale)()}
            {locale.name}
        </button>
    )
}
