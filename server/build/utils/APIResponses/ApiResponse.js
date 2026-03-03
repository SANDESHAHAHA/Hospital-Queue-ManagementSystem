const APIResponse = (res, statusCode, message, data = []) => {
    res.status(statusCode).json({
        message,
        data: data.length > 0 ? data : null
    });
};
export default APIResponse;
//# sourceMappingURL=ApiResponse.js.map