const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");

module.exports = {
    verifyAccessToken: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const bearerToken = authHeader.split(" ");
        const token = bearerToken[1];

        try {
            req.user = jwt.verify(token, "my-secret-key");
            next();
        } catch (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    },
    isAuthenticatedUser: async (req, res, next) => {
        try {
            const token = req.headers["authorization"];
            const bearerToken = token.split(" ")[1];
            const decoded = jwt.verify(bearerToken, "my-secret-key");
            req.user = await Auth.findById(decoded.userId);
            next();

            if (!token) {
                return res.status(401).json({ message: "Unauthorized" });
            }
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return res.status(401).json({ message: "Unauthorized" });
        }
    },
};
