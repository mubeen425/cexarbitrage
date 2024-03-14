const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProfileSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("user_profiles", UserProfileSchema);