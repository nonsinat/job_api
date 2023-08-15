const createCustomError = (msg,statusCode) => {
    return new CustomAPIError(msg,statusCode)
}


module.exports = createCustomError