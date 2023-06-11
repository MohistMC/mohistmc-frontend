import frTranslation from "@/i18n/translations/fr";
import enTranslation from "@/i18n/translations/en";
import {LocaleState} from "@/features/i18n/TranslatorSlice";

const availableLocales = [frTranslation, enTranslation];

interface localesInterface {
    current: LocaleState;
    available: LocaleState[];
}

export const locales: localesInterface = {
    current: enTranslation,
    available: availableLocales,
}
