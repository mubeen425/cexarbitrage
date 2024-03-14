const express = require('express')
const useRouter = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config({ path: "./.env" });

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(cors());

useRouter(app);

connectDB()

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});