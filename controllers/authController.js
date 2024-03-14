const User = require('../models/authModel')
const UserProfile = require('../models/userProfileModel')
const {dataAlreadyExist} = require('../healpers/messages')
const errorHandler = require('../healpers/errorHandler')
const { isDataExist } = require("../services/dbQuries");
const sendToken = require("../utils/jwtToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await isDataExist(User, { email: email }, async (isUserExist) => {
            if (isUserExist) {
                dataAlreadyExist.message = `${email} already registered`;
                errorHandler(dataAlreadyExist, res);
            } else {
                const userObj = new User({
                    name,
                    email,
                    password,
                });
                const user = new User(userObj);
                const savedUser = await user.save();
                if (savedUser._id) {
                    let profileObj = {
                        name: name,
                        email: email,
                        userId: savedUser._id,
                    };

                    const profileData = new UserProfile(profileObj);
                    await profileData.save();
                }
                
                sendToken(user, 201, res);
                

            }
        });
    } catch (error) {
        res.status(500).json({ success: false, errors: error.message });
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body;

    const requiredErrors = [];

    if (!email) {
        requiredErrors.push("Email is required");
    }
    if (!password) {
        requiredErrors.push("Password is required");
    }

    if (requiredErrors.length > 0) {
        return res.status(400).json({
            status: false,
            error_message: "Validation error",
            error: requiredErrors,
        });
    }

    try {
        const user = await User.findOne({ email }).select('password');
        if (!user) {
            return res.status(401).json({
                status: false,
                error_message: "User does not exist",
                error: ["User does not exist"],
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: false,
                error_message: "Invalid email or password",
                error: ["Invalid email or password"],
            });
        }

        const token = jwt.sign({ userId: user._id }, "my-secret-key");
        res.cookie("token", token, { httpOnly: true });

        const userProfile = await UserProfile.findOne({ userId: user._id });

        res.status(200).json({ token, userProfile });
    } catch (error) {
        res.status(417).json({
            status: false,
            error_message: "Failure",
            error: error.message,
        });
    }
}

const Logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { isActive: false });
        res.clearCookie("token");
        res.status(200).json({ status: true, message: "Logout successful" });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Logout unsuccessful",
            error: error.message,
        });
    }
}

module.exports = {
    Signup,
    Login,
    Logout
}