/**
 * Get the API endpoint for the specified version and environment
 *
 * @param version - The version of the API
 */
export const getAPIEndpoint = (version: string = 'v2') => {
    return `https://mohistmc.com/api/${version}`;
}