const mongoose = require("mongoose")
const dbUser = ''
const dpPassword = ''

//connection
const conn = async () => {
    try {

        const dbConn = await mongoose.connection(
            'mongodb+srv://Miqueias:<password>@reactgram.ce32l2b.mongodb.net/?retryWrites=true&w=majority'
        )
        console.log("DB connected")

    } catch(error) {

    }
}