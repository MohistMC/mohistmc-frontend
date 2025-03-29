import frTranslation from '@/i18n/translations/fr'
import enTranslation from '@/i18n/translations/en'
import { LocaleState } from '@/features/i18n/TranslatorSlice'

const availableLocales = [frTranslation, enTranslation]

interface LocalesInterface {
    default: LocaleState
    current: LocaleState
    available: LocaleState[]
}

export const locales: LocalesInterface = {
    default: enTranslation,
    current: enTranslation,
    available: availableLocales as LocaleState[],
}

export const getCurrentLocale = () => {
    const mergedStrings = Object.assign(
        {},
        locales.default.strings,
        locales.current.strings,
    )
    return {
        ...locales.current,
        strings: mergedStrings,
    }
}
