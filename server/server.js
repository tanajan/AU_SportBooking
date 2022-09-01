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

const temppath = './server/routes'
// const temppath = './routes'
readdirSync(temppath)
    .map(r => app.use("/api",require("./routes/" + r )))

// --------- deployment -------------

__dirname=path.resolve()
if(process.env.NODE_ENV==='production') {
     app.use(express.static(path.join(__dirname,'/client/build')))

     app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
     } )
} else {
    app.get("/", (req, res) => {
        res.send("API is running . .")
    });
}

// --------- deployment -------------

//Auto Route


const port = process.env.PORT || 8000;
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });
app.listen(port,()=>console.log('Server is runnning on port '  + port))

