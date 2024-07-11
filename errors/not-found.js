const path = require("path")

const notFound = (req, res) =>{
    const errorFilePath = path.join(__dirname, ("../public/404.html"))
    return res.status(404).sendFile(errorFilePath)
    //return res.status(404).send("Not found")
}

module.exports = notFound