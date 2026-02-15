const errorHandler = (fn) => {
    return (req, res) => {
        fn(req, res).catch((err) => {
            console.log(err);
            return res.status(500).json({
                message: "Internal Server Error",
                errorMessage: err.message
            });
        });
    };
};
export default errorHandler;
//# sourceMappingURL=ErrorHandler.js.map