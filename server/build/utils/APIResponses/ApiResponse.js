const APIResponse = (res, statusCode, message, data = null) => {
    const hasData = data !== undefined && data !== null;
    res.status(statusCode).json({
        message,
        data: hasData ? data : null
    });
};
export default APIResponse;
//# sourceMappingURL=ApiResponse.js.map