const express = require("express")
const path = require("path")
const cors = require("cors")

require("dotenv").config()

const port = 5000
const app = express()

//config JSON and form data response
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
const router = require("./routes/Router")
app.use(router)

app.listen(process.env.PORT || port, () => {
    console.log("Server is running!")
})