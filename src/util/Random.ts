export const Random = {
    /**
     * Generate a random integer between min and max
     */
    int: (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Generate a random string with length
     */
    string: (length: number) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let index = 0; index < length; index++)
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        return result;
    }
}