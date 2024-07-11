const express = require("express")
const app = express()
require("dotenv").config()
const router = require("./router/store_routes")
const connectDB = require("./db/connect")
const notFoundError = require("./errors/not-found")
const path = require("path")
const bodyParser = require("body-parser")
const https = require("https")

const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")

const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

app.use(helmet())
app.use(cors())
app.use(xss())

app.set("trust proxy", 1)

app.use("/api/v1/ecom_store", router)

app.use(notFoundError)

const start = async () =>{
    
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, ()=>{
        console.log(`Server started on port ${PORT}...`)
    })
}

start()