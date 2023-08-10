import frTranslation from "@/i18n/translations/fr";
import enTranslation from "@/i18n/translations/en";
import zhTranslation from "@/i18n/translations/zh";
import {LocaleState} from "@/features/i18n/TranslatorSlice";

const availableLocales = [frTranslation, enTranslation, zhTranslation];

interface LocalesInterface {
    default: LocaleState;
    current: LocaleState;
    available: LocaleState[];
}

export const locales: LocalesInterface = {
    default: enTranslation,
    current: enTranslation,
    available: availableLocales,
}

export const getCurrentLocale = () => {
    const mergedStrings = Object.assign({}, locales.default.strings, locales.current.strings);
    return {
        ...locales.current,
        strings: mergedStrings
    }
}