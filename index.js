const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
require('dotenv').config()
const steamItem = require('./routes/steamItem.routes');

const PORT = process.env.PORT || 8080

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use("/steam_item", steamItem);

const user = process.env.MONGOOSE_USER
const password = process.env.MONGOOSE_PASSWORD

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.wjjfs.mongodb.net/botUsers?retryWrites=true&w=majority`);
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()


