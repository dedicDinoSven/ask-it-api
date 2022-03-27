export const errorHandler = (err) => {
    return err?.response?.data?.message
        || err?.message || err?.toString();
};