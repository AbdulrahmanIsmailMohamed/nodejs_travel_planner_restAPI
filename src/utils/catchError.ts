export const catchError = async <T>(promise: Promise<T>): Promise<T> => {
    try {
        return await promise;
    } catch (error) {
        console.log(`Error: ${error}`);
        throw error;
    }
};
