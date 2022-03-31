const mongoose = require('mongoose')

module.exports = async() => {
    const DB_URI = process.env.DB_URI;
    console.log(DB_URI)
    try {
         const connectionParams = {
             useNewUrlParser:true,
             useUnifiedTopology:true
         }
         await mongoose.connect(DB_URI,
         connectionParams
         )
         console.log("Connected to database")
    } catch (error) {
        console.log("Error connection to database.", error)
    }
}