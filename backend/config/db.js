require("dotenv").config()
const mongoose = require("mongoose")

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

//connection
const conn = async () => {
    try {

        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@reactgram.ce32l2b.mongodb.net/?retryWrites=true&w=majority`
        )
        console.log("DB connected")

        return dbConn

    } catch(error) {
        console.log(error)
    }
}

conn()
module.exports = conn