require("dotenv").config()

const connectDB = require("./db/connect")
const Product = require("./model/product_model")

//json document for population
const jsonProducts = require("./products.json")

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany() //delete the whole db
        await Product.create(jsonProducts) //populate the db with the json array
        process.exit(0) //exit safely with success
    }catch(err){
        console.log(err)
        process.exit(1) //if there was an error stop everything and exit with error
    }
}
//start()

//DATABASE PART FINISHED