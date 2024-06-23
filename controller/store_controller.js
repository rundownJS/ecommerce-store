//import model
const Product = require("../model/product_model")
//send an error file
const path = require("path")

//NEW FIX!!
const he = require("he")

const getAllProducts = async (req, res) =>{
    //getting all of the products + filtering
    
    //get all request queries
    const { freeDelivery, name, sort, category, numericFilter } = req.query
    const queryObject = {}

    //only the queries that are present inside the request will be used to create a filter
    if(freeDelivery === "true"){
        //if we have a free delivery filter set to true and only to true
        //we add it to the object
        queryObject.freeDelivery = freeDelivery
    }
    if(category){
        //category filter present will return products with certain category
        queryObject.category = category
    }
    if(name){
        //if the user uses the search bar to search for a product
        queryObject.name = { $regex: name, $options: "i" }
    }
    if(numericFilter){
        //if the user provides a price filter
        //price less than (n)

        //found the fic to the numeric bug
        //there seemed to be tn HTML encoding that had to be decoded before being used in the request
        const decodedNumericFilter = he.decode(numericFilter)

        const operatorMap = {
            //convering the less than to mongoose understandable variable
            "<=": "$lte"
        }
        //the regex to match when filtering
        const regEx = /\b(<=)\b/g 

        //now we replace with the values
        let filters = decodedNumericFilter.replace(regEx, (match) =>{
            return `-${operatorMap[match]}-`
        })
        
        //what the request looks like now is "numericFilter=price-$lte-100"
        //we split it to field=price, operator=$lte, value=100
        filters = filters.split(",").forEach(element => {
            const [ field, operator, value ] = element.split("-")
            
            if(field === "price"){
                //and if we used it properly we pass it to the query object
                queryObject[field] = { [ operator ]: Number(value) }
            }
        })
        
    }

    //default sort + custom sorting
    //get products based on the query
    let result = Product.find( queryObject )

    //the only sorting methods allowed
    if(sort === "-price"){ //high to low
        result.sort(sort)
    }else if(sort === "price"){ //low to high
        result.sort(sort)
    }else if(sort === "name"){
        result.sort(sort)
    }else if(sort === "-name"){
        result.sort(sort)
    }

    //pagitation
    //we want so send data in pages of 20
    const page = req.query.page || 1
    const limit = 20

    //if we are on page 2 we would skip the first 20 products and so on
    const skip = (page - 1) * limit

    //get the final data
    result = result.skip(skip).limit(limit)

    //await the promise
    const products = await result
    //all the products in the db
    const dbProductsAmount = await Product.countDocuments()
    //get all products with the current search
    const productsFound = await Product.countDocuments( queryObject )

    res.status(200).json({ productsFound, dbProductsAmount, length: products.length, products })
}

const getSingleProduct = async (req, res) =>{

    //get the id inside the request params
    const { id:PRODUCT_NAME } = req.params

    //get info about a certain product using its unique id
    //** CATCH ERROR / CUSTOM ERROR
    try{
        const productInfo = await Product.findOne({"name": PRODUCT_NAME})
        
        if(!productInfo){
            return res.status(404).json({ msg: "Product does not exist" })
        }

        res.status(200).json({ productInfo })
    }catch(err){
        res.status(400).json({ msg: err })
    }

    
}

module.exports = {
    getAllProducts,
    getSingleProduct
}