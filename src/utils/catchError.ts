export const catchError = async (Promiss: unknown) => {
    try {
        return await Promiss
    } catch (error) {
        console.log(`Error: ${error}`);
        throw error
    }
}