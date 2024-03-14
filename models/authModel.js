const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {dbError} = require("../healpers/messages");

const AuthSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"]
        },
        userProfileId: {
            type: Schema.Types.ObjectId,
            ref: "user_profiles",
        },
    },
    {timestamps: true}
);

AuthSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        dbError.message = error.message;
        dbError.reason = error.reason;
        next(dbError);
    }
});

AuthSchema.methods.getJWTToken = function () {
    return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    });
};

AuthSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const errorHandler = (error, res, next) => {
    res.status(400).json({success: false, message: error});
    next && next();
};

AuthSchema.methods.encryptPassword = async function (password, res) {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        dbError.message = error.message;
        dbError.reason = error.reason;
        errorHandler(dbError, res);
    }
};

module.exports = mongoose.model("users", AuthSchema);