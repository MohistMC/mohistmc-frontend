import {LocaleState} from "@/features/i18n/TranslatorSlice";
import EnglishLogoSVG from "@/components/svgs/EnglishLogoSVG";
import FrenchLogoSVG from "@/components/svgs/FranchLogoSVG";

/**
 * Returns the SVG function component for the locale.
 *
 * @param locale The locale to get the SVG for
 */
export default function getLocaleIconSVG(locale: LocaleState) {
    switch (locale.initials) {
        case "en":
            return EnglishLogoSVG
        case "fr":
            return FrenchLogoSVG
        default:
            return EnglishLogoSVG
    }
}

/**
 * Returns an array of strings that are between % signs with the original ones.
 * Example: "Hello %name%" will return ["Hello ", "name"]
 *
 * @param str The string to parse
 */
export function getLocaleStringAsArgs(str: string): string[] {
    return str ? str.split(/%([^%]+)%/).filter(Boolean) : [];
}