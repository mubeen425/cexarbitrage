const mongoose = require("mongoose");

const connectDB = async () => {
    // const DB_URL = `mongodb+srv://coinSelect:coinSelect@cluster0.5iwlng7.mongodb.net/coinSelect?retryWrites=true&w=majority`
    const DB_URL = `mongodb://localhost:27017`
    // const DB_URL = "mongodb+srv://mf0981220:faizan123@cluster0.gyzug4f.mongodb.net/?retryWrites=true&w=majority";

    try {
        let connection = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (connection) {
            console.log("connection successful");
        }
    } catch (error) {
        console.log("connection failed");
    }
};
mongoose.connection.on("connected", () => {
    console.log("Mongoose conencted to db");
});

mongoose.connection.on("error", (err) => {
    console.log("Mongo db connection Failed: \n Reason:", err.message);
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
});

module.exports = connectDB;
