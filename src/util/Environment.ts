/**
 * Get the API endpoint for the specified version and environment
 *
 * @param version - The version of the API
 */
export const getAPIEndpoint = (version: string = 'v2') => {
    return process.env.NODE_ENV === "development" ? `http://localhost:2024/api/${version}` : `https://mohistmc.com/api/${version}`;
}
