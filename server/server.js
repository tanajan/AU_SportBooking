const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const {readdirSync }  = require('fs')
const connectDB = require("./config/db")
const path = require("path")


const app = express();

 
connectDB();
//middleware

app.use(morgan("dev"))
app.use(bodyParser.json({limit: "2mb"}))
app.use(cors())
app.use(express.static(path.join(__dirname, "client", "build")))

//Auto Route
readdirSync('./routes')
    .map(r => app.use("/api",require("./routes/" + r )))

const port = process.env.PORT || 8000;
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port,()=>console.log('Server is runnning on port'  + port))

