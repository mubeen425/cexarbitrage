const errorHandler = (error, res, next) => {
    res.status(400).json({ success: false, message: error });
    next && next();
};
module.exports = errorHandler;