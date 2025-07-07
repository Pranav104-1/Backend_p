const AsyncHandler = (func) => async (req, res, next) => {
    try {
        await func(req, res, next);
    } catch (err) {
        const statusCode = (typeof err.code === "number" && err.code >= 100 && err.code < 600) 
            ? err.code 
            : 500;

        res.status(statusCode).json({
            success: false,
            message: err.message || "Something went wrong!",
        });
    }
};

export { AsyncHandler };