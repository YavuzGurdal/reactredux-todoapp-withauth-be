const errorHandler = (err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || 'Something went Wrong!'

    return res.status(status).json({
        success: false,
        status,
        message
    })
}

module.exports = {
    errorHandler,
}