import {formatString} from "@/util/LocaleHelper";
import {StringKey} from "@/features/i18n/TranslatorSlice";

/**
 * Returns the time from now in text.
 *
 * @param date The date to compare
 * @param strings The strings to use
 */
export const getTimeAgoInText = (date: Date, strings: Record<StringKey, string>): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);

    if (years === 1) {
        return strings['year.ago'];
    } else if (years > 1) {
        return formatString(strings['years.ago'], years);
    } else if (months === 1) {
        return strings['month.ago'];
    } else if (months > 1) {
        return formatString(strings['months.ago'], months);
    } else if (weeks === 1) {
        return strings['week.ago'];
    } else if (weeks > 1) {
        return formatString(strings['weeks.ago'], weeks);
    } else if (days === 1) {
        return strings['day.ago'];
    } else if (days > 1) {
        return formatString(strings['days.ago'], days);
    } else if (hours === 1) {
        return strings['hour.ago'];
    } else if (hours > 1) {
        return formatString(strings['hours.ago'], hours);
    } else if (minutes === 1) {
        return strings['minute.ago'];
    } else if (minutes > 1) {
        return formatString(strings['minutes.ago'], minutes);
    } else if (seconds === 1) {
        return strings['second.ago'];
    } else if (seconds > 1) {
        return formatString(strings['seconds.ago'], seconds);
    } else {
        return strings['just.now'];
    }
}