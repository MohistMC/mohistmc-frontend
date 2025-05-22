const PROD_API_ENDPOINT = 'https://api.mohistmc.com'
const DEV_API_ENDPOINT = 'http://localhost:3568'

/**
 * Get the API endpoint for the specified version and environment
 *
 * @param version - The version of the API
 */
export const getAPIEndpoint = () => {
    return isDevEnv ? `${DEV_API_ENDPOINT}` : `${PROD_API_ENDPOINT}`
}

export const isDevEnv = process.env.NODE_ENV === 'development'
