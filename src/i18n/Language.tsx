import frTranslation from "@/i18n/translations/fr";
import enTranslation from "@/i18n/translations/en";
import zhTranslation from "@/i18n/translations/zh";
import {LocaleState} from "@/features/i18n/TranslatorSlice";

const availableLocales = [frTranslation, enTranslation, zhTranslation];

interface localesInterface {
    current: LocaleState;
    available: LocaleState[];
}

export const locales: localesInterface = {
    current: enTranslation,
    available: availableLocales,
}
