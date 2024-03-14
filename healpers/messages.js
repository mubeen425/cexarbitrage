const messages = {
    dbError: {
        code: "502",
        message: "Database Error",
        reason: "",
    },
    notFound: {
        code: "404",
        message: "Request not found",
    },
    unauthorizedError: {
        code: "401",
        message: "Invalid Email or Password",
    },
    internalServerError: {
        code: "500",
        message: "Internal server error",
    },
    userNotFound: {
        code: "404",
        message: "User not found",
    },
    notMatched: {
        code: "400",
        message: "Password Not Matched",
    },
    dataAlreadyExist: {
        code: "504",
        message: "Data already exist",
    },
    duplicateErrorMessage: {
        code: "400",
        message: "Duplication Error",
    },
};

module.exports = messages;