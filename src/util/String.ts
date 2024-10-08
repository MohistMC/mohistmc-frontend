/**
 * Capitalizes the first letter of a string
 * @param s The string to capitalize
 */
export function capitalizeFirstLetter(
    s: string | undefined,
): string | undefined {
    return s && s[0].toUpperCase() + s.slice(1)
}

/**
 * Returns the initials of a phrase (e.g. "John Doe" -> "JD")
 * @param phrase The phrase to get the initials of
 */
export function getInitials(phrase: string): string {
    return phrase
        .split(' ')
        .filter((word) => word.length > 0)
        .map((word) => word[0].toUpperCase())
        .join('')
}

/**
 * Returns the copyright text with the current year
 */
export function getCopyrightText() {
    return `© 2019-${new Date().getFullYear()}`
}
