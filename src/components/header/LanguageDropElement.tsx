import {LocaleState} from "@/features/i18n/TranslatorSlice";
import getLocaleIconSVG from "@/util/LocaleHelper";

interface LanguageDropElementProps {
    locale: LocaleState;
    handleLocaleChangeCallback: (locale: LocaleState) => void
}

export default function LanguageDropElement({ locale, handleLocaleChangeCallback }: LanguageDropElementProps) {
    return (
        <li>
            <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-200 dark:hover:text-white"
                role="menuitem"
                onClick={() => handleLocaleChangeCallback(locale)}
            >
                <div className="inline-flex items-center">
                    {getLocaleIconSVG(locale)()}
                    {locale.name}
                </div>
            </button>
        </li>
    );
}