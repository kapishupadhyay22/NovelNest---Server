const { customApiError } = require('../errors/customerrors');

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof customApiError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res.status(500).json({ msg: "something went wrong" });
};

module.exports = errorHandlerMiddleware;
// new commit