const express = require("express")
const router = express.Router()

const { getAllProducts, getSingleProduct } = require("../controller/store_controller")

router.route("/home").get(getAllProducts)
router.route("/product/:id").get(getSingleProduct)

module.exports = router