const express = require("express");
const router = express.Router();

const {
    Signup,
    Login,
    Logout
} = require("../controllers/authController");
const {
    verifyAccessToken,
    isAuthenticatedUser,
} = require("../middlewares/auth");

router.post("/signup", Signup);
router.post("/login", Login);

router.post("/logout", verifyAccessToken, isAuthenticatedUser, Logout);

module.exports = router;
