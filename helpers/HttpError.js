const messageList = {
    400: "Bad Request",
    401: "Unauthoriyed",
    403: "Forbidden",
    404: "Niot Found",
    409: "Conflict",
}

const HttpError = (status, message = messageList[status]) =>{
    const error = new Error(message);
    error.status = status;
    return error;
}
module.exports = HttpError;